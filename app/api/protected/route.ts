import { NextResponse } from 'next/server';
import { z } from 'zod';
import { withRateLimit } from '@/lib/rate-limit';

// Schéma de validation pour les données d'entrée
const requestSchema = z.object({
  title: z.string().min(3).max(100),
  content: z.string().min(10),
});

// Gestionnaire de route protégé par authentification et rate limiting
async function handler(req: Request) {
  try {
    // Vérification temporaire de l'authentification
    // Cette vérification sera remplacée par NextAuth.js après l'installation complète
    const cookies = req.headers.get('cookie') || '';
    const hasSession = cookies.includes('session=');
    
    if (!hasSession) {
      return NextResponse.json(
        { message: 'Non autorisé' },
        { status: 401 }
      );
    }

    // Pour les requêtes POST uniquement
    if (req.method !== 'POST') {
      return NextResponse.json(
        { message: 'Méthode non autorisée' },
        { status: 405 }
      );
    }

    // Valider les données d'entrée
    const body = await req.json();
    const validatedData = requestSchema.safeParse(body);
    
    if (!validatedData.success) {
      return NextResponse.json(
        { 
          message: 'Données invalides',
          errors: validatedData.error.format() 
        },
        { status: 400 }
      );
    }

    // Traitement de la requête
    const { title, content } = validatedData.data;
    
    // Logique métier ici...
    
    return NextResponse.json(
      { 
        message: 'Requête traitée avec succès',
        data: { title, content }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Erreur dans /api/protected:', error);
    return NextResponse.json(
      { message: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Appliquer le rate limiting (10 requêtes par minute)
export const POST = withRateLimit(handler, { limit: 10, duration: 60 });
