import { z } from 'zod';
import { ALLOWED_MIME_TYPES } from '../file-utils';

// Schéma de base pour les identifiants
export const idSchema = z.string().uuid('ID invalide');

// Schéma pour les emails
export const emailSchema = z
  .string()
  .email('Email invalide')
  .max(255, 'L\'email ne doit pas dépasser 255 caractères');

// Schéma pour les mots de passe
export const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .max(100, 'Le mot de passe ne doit pas dépasser 100 caractères')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
    'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
  );

// Schéma pour les noms d'utilisateur
export const usernameSchema = z
  .string()
  .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
  .max(50, 'Le nom d\'utilisateur ne doit pas dépasser 50 caractères')
  .regex(
    /^[a-zA-Z0-9_-]+$/,
    'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores'
  );

// Schéma pour les titres d'articles/pages
export const titleSchema = z
  .string()
  .min(3, 'Le titre doit contenir au moins 3 caractères')
  .max(255, 'Le titre ne doit pas dépasser 255 caractères');

// Schéma pour le contenu riche
export const richTextSchema = z.string().min(1, 'Le contenu ne peut pas être vide');

// Schéma pour les slugs
export const slugSchema = z
  .string()
  .min(3, 'Le slug doit contenir au moins 3 caractères')
  .max(100, 'Le slug ne doit pas dépasser 100 caractères')
  .regex(
    /^[a-z0-9-]+$/,
    'Le slug ne peut contenir que des lettres minuscules, des chiffres et des tirets'
  );

// Schéma pour les URLs
export const urlSchema = z
  .string()
  .url('URL invalide')
  .max(2000, "L'URL ne doit pas dépasser 2000 caractères");

// Schéma pour les fichiers téléchargés
export const fileSchema = z.object({
  name: z.string().min(1, 'Le nom du fichier est requis'),
  type: z
    .string()
    .refine((type) => Object.keys(ALLOWED_MIME_TYPES).includes(type), {
      message: 'Type de fichier non autorisé',
    }),
  size: z
    .number()
    .max(5 * 1024 * 1024, 'La taille du fichier ne doit pas dépasser 5 Mo'),
  path: z.string().optional(),
  lastModified: z.number().optional(),
});

// Schéma pour les téléchargements multiples
export const filesSchema = z.array(fileSchema).max(10, 'Maximum 10 fichiers autorisés');

// Schéma pour les métadonnées SEO
export const seoMetadataSchema = z.object({
  title: z.string().max(100, 'Le titre SEO ne doit pas dépasser 100 caractères').optional(),
  description: z
    .string()
    .max(160, 'La description SEO ne doit pas dépasser 160 caractères')
    .optional(),
  keywords: z
    .array(z.string().max(50, 'Chaque mot-clé doit faire moins de 50 caractères'))
    .max(10, 'Maximum 10 mots-clés')
    .optional(),
  noIndex: z.boolean().optional(),
  noFollow: z.boolean().optional(),
});

// Schéma pour les dates
export const dateSchema = z.union([
  z.string().datetime(),
  z.date(),
  z.number(),
]);

// Fonction utilitaire pour valider les schémas
export async function validateWithZod<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: boolean; data?: T; errors?: Record<string, string> }> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    throw error;
  }
}
