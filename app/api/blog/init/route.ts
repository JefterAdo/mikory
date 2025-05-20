import { NextResponse } from 'next/server';
import { initDatabase, testConnection } from '@/lib/db';

// Route pour initialiser la base de données
export async function GET() {
  try {
    // Tester d'abord la connexion à la base de données
    await testConnection();
    
    // Initialiser la base de données
    await initDatabase();
    
    return NextResponse.json({ success: true, message: 'Base de données initialisée avec succès' });
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de l\'initialisation de la base de données', 
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
