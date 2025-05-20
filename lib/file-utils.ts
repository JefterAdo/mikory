import { extname } from 'path';
import { statSync } from 'fs';

// Types MIME autorisés avec leurs extensions correspondantes
export const ALLOWED_MIME_TYPES = {
  'image/jpeg': '.jpeg',
  'image/jpg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/svg+xml': '.svg',
  'application/pdf': '.pdf',
  'application/msword': '.doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.ms-excel': '.xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.ms-powerpoint': '.ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'text/plain': '.txt',
  'text/csv': '.csv',
  'application/zip': '.zip',
  'application/x-rar-compressed': '.rar',
} as const;

// Type pour les types MIME autorisés
export type AllowedMimeType = keyof typeof ALLOWED_MIME_TYPES;

// Type pour les extensions autorisées
export type AllowedExtension = typeof ALLOWED_MIME_TYPES[AllowedMimeType];



// Taille maximale du fichier (5 Mo)
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Vérifie si le type MIME est autorisé
export function isAllowedMimeType(mimeType: string | null | undefined): mimeType is AllowedMimeType {
  if (!mimeType) return false;
  return Object.prototype.hasOwnProperty.call(ALLOWED_MIME_TYPES, mimeType);
}

// Vérifie si l'extension du fichier correspond au type MIME
export function validateFileExtension(
  filename: string,
  mimeType: string
): boolean {
  if (!filename || !mimeType) return false;
  
  try {
    const extension = extname(filename).toLowerCase();
    
    // Vérifier si le type MIME est autorisé
    if (!isAllowedMimeType(mimeType)) {
      return false;
    }
    
    // Vérifier si l'extension correspond au type MIME
    const expectedExtension = ALLOWED_MIME_TYPES[mimeType as AllowedMimeType];
    return expectedExtension === extension;
  } catch (error) {
    console.error('Erreur lors de la validation de l\'extension du fichier:', error);
    return false;
  }
}

// Vérifie si le fichier ne dépasse pas la taille maximale
export function validateFileSize(filePath: string): boolean {
  try {
    const stats = statSync(filePath);
    return stats.size <= MAX_FILE_SIZE;
  } catch (error) {
    console.error('Erreur lors de la vérification de la taille du fichier:', error);
    return false;
  }
}

// Nettoie le nom du fichier pour éviter les injections
export function sanitizeFilename(filename: string): string {
  return filename
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^\w\s.-]/g, '') // Garde uniquement les caractères alphanumériques, espaces, points et tirets
    .replace(/\s+/g, '_') // Remplace les espaces par des underscores
    .toLowerCase();
}

// Génère un nom de fichier unique
export function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const sanitized = sanitizeFilename(originalName);
  const extension = extname(sanitized);
  const nameWithoutExt = sanitized.replace(extension, '').substring(0, 50); // Limite la longueur du nom
  
  return `${nameWithoutExt}_${timestamp}_${randomString}${extension}`;
}
