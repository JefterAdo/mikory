import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm, File } from 'formidable';
import { promisify } from 'util';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream, existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { ALLOWED_MIME_TYPES, isAllowedMimeType, validateFileExtension, MAX_FILE_SIZE, generateUniqueFilename } from '@/lib/file-utils';
import VirusScanner from '@/lib/virus-scanner';
import { withErrorHandler, AppError, ValidationError, ForbiddenError, NotFoundError, logger } from '@/lib/error-handler';
import { z } from 'zod';
import { validateRequest } from '@/lib/validation/validate-request';

// Schéma de validation pour les téléchargements de fichiers
const uploadSchema = z.object({
  name: z.string().min(1, 'Le nom du fichier est requis'),
  type: z.string().refine(
    type => Object.keys(ALLOWED_MIME_TYPES).includes(type),
    'Type de fichier non autorisé'
  ),
  size: z.number().max(MAX_FILE_SIZE, `La taille du fichier ne doit pas dépasser ${MAX_FILE_SIZE / (1024 * 1024)} Mo`),
  path: z.string().optional(),
  lastModified: z.number().optional()
});

const uploadRequestSchema = z.object({
  files: z.array(uploadSchema).min(1, 'Au moins un fichier est requis')
});

// Configuration des dossiers
const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads/media');
const QUARANTINE_DIR = path.join(process.cwd(), 'quarantine');
const LOGS_DIR = path.join(process.cwd(), 'logs');

// Créer les dossiers s'ils n'existent pas
[UPLOAD_DIR, QUARANTINE_DIR, LOGS_DIR].forEach(dir => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

// Désactive le bodyParser pour gérer manuellement le formulaire
export const config = {
  api: {
    bodyParser: false,
  },
};

// Types personnalisés
type UploadedFile = {
  name: string;
  path: string;
  type: string;
  size: number;
};

// Fonction utilitaire pour formater les tailles de fichiers
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Fonction pour logger les activités de téléchargement
const logUploadActivity = async (message: string, data: Record<string, any> = {}) => {
  const timestamp = new Date().toISOString();
  const logEntry = `${timestamp} - ${message} ${JSON.stringify(data, null, 2)}\n`;
  
  try {
    await fs.appendFile(
      path.join(LOGS_DIR, 'file-uploads.log'),
      logEntry
    );
  } catch (error) {
    console.error('Erreur lors de l\'écriture dans le journal:', error);
  }
};

export async function GET(request: NextRequest) {
  try {
    // Vérifier si le répertoire de téléchargement existe
    if (!existsSync(UPLOAD_DIR)) {
      await logUploadActivity('Le répertoire de téléchargement n\'existe pas encore', { directory: UPLOAD_DIR });
      return NextResponse.json({ success: true, media: [] });
    }

    // Lire le contenu du répertoire
    const files = await fs.readdir(UPLOAD_DIR);
    
    // Obtenir les détails de chaque fichier
    const mediaItems = await Promise.all(
      files.map(async (file) => {
        try {
          const filePath = path.join(UPLOAD_DIR, file);
          const stat = await fs.stat(filePath);
          
          if (!stat.isFile()) return null;
          
          // Vérifier que le fichier est d'un type autorisé
          const extension = extname(file).toLowerCase();
          const isValidExtension = Object.values(ALLOWED_MIME_TYPES).includes(extension as any);
          
          if (!isValidExtension) return null;
          
          return {
            name: file,
            url: `/uploads/media/${file}`,
            size: stat.size,
            sizeFormatted: formatFileSize(stat.size),
            lastModified: stat.mtime.toISOString(),
            type: path.extname(file).substring(1).toUpperCase()
          };
        } catch (error) {
          console.error(`Erreur lors du traitement du fichier ${file}:`, error);
          return null;
        }
      })
    );

    // Filtrer les éléments null et trier par date de modification
    const filteredMediaItems = mediaItems
      .filter((item): item is NonNullable<typeof item> => item !== null)
      .sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());

    await logUploadActivity('Liste des médias récupérée avec succès', { count: filteredMediaItems.length });
    
    return NextResponse.json({ 
      success: true, 
      data: { media: filteredMediaItems },
      message: 'Liste des médias récupérée avec succès'
    });

  } catch (error) {
    const errorMessage = 'Erreur lors de la récupération de la liste des médias';
    console.error(errorMessage, error);
    
    await logUploadActivity(errorMessage, { 
      error: error instanceof Error ? error.message : 'Erreur inconnue' 
    });
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur serveur lors de la récupération des médias.' 
      }, 
      { status: 500 }
    );
  }
}

// Gestion des téléchargements de fichiers
export const POST = withErrorHandler(async (request: NextRequest) => {
  // Valider la requête
  const validation = await validateRequest({
    body: uploadRequestSchema
  })(request);

  if (validation instanceof NextResponse) {
    return validation; // Retourne les erreurs de validation
  }
  // Initialiser le scanner de virus
  let scanner;
  try {
    scanner = await VirusScanner.getInstance();
  } catch (error) {
    console.error('Erreur d\'initialisation du scanner de virus:', error);
    // On continue malgré l'erreur, mais on enregistre un avertissement
    await logUploadActivity('Avertissement: Le scanner de virus n\'a pas pu être initialisé', {
      warning: 'Les fichiers ne seront pas scannés pour les logiciels malveillants',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
  }

  // Configurer formidable pour gérer le téléchargement
  const form = new IncomingForm({
    maxFileSize: MAX_FILE_SIZE,
    maxFields: 5, // Nombre maximal de champs de fichier
    keepExtensions: true,
    allowEmptyFiles: false,
    multiples: true,
    uploadDir: UPLOAD_DIR,
    filter: ({ mimetype }) => {
      // Vérifier le type MIME
      if (!mimetype || !isAllowedMimeType(mimetype)) {
        return false;
      }
      return true;
    },
  });

  try {
    // Parser la requête avec formidable
    const [fields, files] = await new Promise<[any, any]>((resolve, reject) => {
      form.parse(request as any, (err, fields, files) => {
        if (err) return reject(err);
        resolve([fields, files]);
      });
    });

    const uploadedFiles: UploadedFile[] = [];
    const errors: string[] = [];

    // Traiter chaque fichier téléchargé
    for (const fileField in files) {
      const fileArray = Array.isArray(files[fileField]) ? files[fileField] : [files[fileField]];
      
      for (const file of fileArray as File[]) {
        try {
          // Vérifier si le fichier est valide
          if (!file.originalFilename || !file.mimetype || !file.filepath) {
            errors.push(`Le fichier est invalide: ${file.originalFilename || 'Nom inconnu'}`);
            continue;
          }

          // Vérifier le type MIME
          if (!isAllowedMimeType(file.mimetype)) {
            errors.push(`Type de fichier non autorisé: ${file.mimetype}`);
            await fs.unlink(file.filepath).catch(console.error);
            continue;
          }

          // Vérifier l'extension du fichier
          if (!validateFileExtension(file.originalFilename, file.mimetype)) {
            errors.push(`L'extension du fichier ne correspond pas à son type MIME: ${file.originalFilename}`);
            await fs.unlink(file.filepath).catch(console.error);
            continue;
          }

          // Vérifier la taille du fichier
          const stats = await fs.stat(file.filepath);
          if (stats.size > MAX_FILE_SIZE) {
            errors.push(`Le fichier dépasse la taille maximale autorisée (${formatFileSize(MAX_FILE_SIZE)}): ${file.originalFilename}`);
            await fs.unlink(file.filepath).catch(console.error);
            continue;
          }

          // Scanner le fichier pour les logiciels malveillants si le scanner est disponible
          if (scanner) {
            try {
              const scanResult = await scanner.scanFile(file.filepath);
              if (scanResult.isInfected) {
                errors.push(`Fichier infecté détecté: ${file.originalFilename} - Virus: ${scanResult.viruses?.join(', ')}`);
                await fs.unlink(file.filepath).catch(console.error);
                continue;
              }
            } catch (scanError) {
              console.error('Erreur lors du scan antivirus:', scanError);
              // En cas d'erreur de scan, on peut choisir de rejeter le fichier ou de continuer
              // Ici, on choisit de continuer mais de logger l'erreur
              await logUploadActivity('Erreur lors du scan antivirus', {
                file: file.originalFilename,
                error: scanError instanceof Error ? scanError.message : 'Erreur inconnue'
              });
            }
          }

          // Générer un nom de fichier sécurisé
          const safeFilename = generateUniqueFilename(file.originalFilename);
          const newPath = path.join(UPLOAD_DIR, safeFilename);
          
          // Renommer le fichier temporaire avec le nom sécurisé
          await fs.rename(file.filepath, newPath);

          // Ajouter les détails du fichier à la liste des fichiers téléchargés
          uploadedFiles.push({
            name: safeFilename,
            path: newPath,
            type: file.mimetype,
            size: stats.size
          });

          // Journaliser le téléchargement réussi
          await logUploadActivity('Fichier téléchargé avec succès', {
            originalName: file.originalFilename,
            savedAs: safeFilename,
            size: stats.size,
            type: file.mimetype
          });

        } catch (error) {
          const errorMessage = `Erreur lors du traitement du fichier ${file.originalFilename || 'inconnu'}`;
          console.error(errorMessage, error);
          errors.push(`${errorMessage}: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
          
          // Nettoyer les fichiers temporaires en cas d'erreur
          try {
            if (file.filepath) {
              await fs.unlink(file.filepath).catch(console.error);
            }
          } catch (cleanupError) {
            console.error('Erreur lors du nettoyage du fichier temporaire:', cleanupError);
          }
        }
      }
    }

    // Préparer la réponse
    const responseData = {
      success: uploadedFiles.length > 0,
      data: { files: uploadedFiles.map(file => ({
        name: path.basename(file.name),
        url: `/uploads/media/${path.basename(file.name)}`,
        size: file.size,
        sizeFormatted: formatFileSize(file.size),
        type: file.type
      }))},
      message: uploadedFiles.length > 0 ? 'Fichier téléchargé avec succès' : 'Aucun fichier téléchargé',
      errors: errors.length > 0 ? errors : undefined
    };

    return NextResponse.json(responseData, {
      status: responseData.success ? 201 : errors.length > 0 ? 400 : 200
    });

  } catch (error) {
    const errorMessage = 'Erreur lors du traitement du téléchargement';
    console.error(errorMessage, error);
    
    await logUploadActivity(errorMessage, {
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    });
    
    // Utiliser notre gestionnaire d'erreurs personnalisé
    if (error instanceof Error) {
      logger.error('Erreur lors du téléchargement du fichier:', error);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Une erreur est survenue lors du téléchargement du fichier.',
          ...(process.env.NODE_ENV === 'development' && {
            error: error.message,
            stack: error.stack
          })
        }, 
        { status: 500 }
      );
    }
    
    // Pour les erreurs non-Error
    logger.error('Erreur inconnue lors du téléchargement du fichier:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Une erreur inconnue est survenue lors du téléchargement du fichier.'
      }, 
      { status: 500 }
    );
  }
});
