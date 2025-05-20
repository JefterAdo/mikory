import { z } from 'zod';

/**
 * Validation du schéma des variables d'environnement
 * Cette approche garantit que toutes les variables requises sont présentes
 * et correctement formatées avant le démarrage de l'application
 */
const envSchema = z.object({
  // Environnement d'exécution
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Base de données
  DATABASE_URL: z.string().url('L\'URL de la base de données doit être une URL valide'),
  
  // Authentification
  NEXTAUTH_SECRET: z.string().min(32, 'Le secret NextAuth doit contenir au moins 32 caractères'),
  NEXTAUTH_URL: z.string().url().optional().default('http://localhost:3000'),
  
  // Protection CSRF
  CSRF_SECRET: z.string().min(32).optional(),
  
  // Rate limiting (optionnel)
  REDIS_URL: z.string().url().optional(),
  
  // Téléchargement de fichiers (optionnel)
  UPLOADTHING_SECRET: z.string().optional(),
  UPLOADTHING_APP_ID: z.string().optional(),
});

/**
 * Validation des variables d'environnement
 * Lève une exception avec des messages d'erreur détaillés si la validation échoue
 */
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof Error) {
      console.error('❌ Variables d\'environnement invalides:', error.message);
    } else if (error && typeof error === 'object' && 'format' in error && typeof error.format === 'function') {
      console.error('❌ Variables d\'environnement invalides:', error.format());
    } else {
      console.error('❌ Variables d\'environnement invalides');
    }
    throw new Error('Impossible de démarrer l\'application en raison de variables d\'environnement manquantes ou invalides');
  }
}

export const env = validateEnv();
