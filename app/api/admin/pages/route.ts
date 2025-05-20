import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface PageData {
  title: string;
  content: string;
  featured_image?: string; // featured_image est optionnel
  slug?: string; // Le slug sera généré si non fourni
}

async function getDbConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      connectTimeout: 10000 // 10 secondes
    });
    console.log('Connexion à la base de données réussie.');
    return connection;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    throw new Error('Impossible de se connecter à la base de données.');
  }
}

export async function POST(request: NextRequest) {
  let connection;
  try {
    const body: PageData = await request.json();
    const { title, content, featured_image } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Le titre et le contenu sont requis.' }, { status: 400 });
    }

    // Générer un slug (amélioré pour l'unicité et les caractères spéciaux)
    // On s'assure que le slug est unique, par exemple en ajoutant un timestamp ou un identifiant court si nécessaire.
    // Pour cet exemple, on garde une version simple, mais en production, il faudrait vérifier l'unicité.
    const slug = body.slug || title.toLowerCase()
      .trim()
      .replace(/[\s_]+/g, '-') // Remplacer les espaces et underscores par des tirets
      .replace(/[^a-z0-9-]/g, '') // Supprimer les caractères non alphanumériques sauf les tirets
      .replace(/--+/g, '-') // Remplacer les tirets multiples par un seul
      .replace(/^-+|-+$/g, ''); // Supprimer les tirets en début et fin de chaîne

    connection = await getDbConnection();

    const query = `
      INSERT INTO blog_posts (title, content, slug, featured_image, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `;
    
    const values = [title, content, slug, featured_image || null, 'published']; // Statut par défaut 'published'

    const [result] = await connection.execute(query, values);
    await connection.end();
    
    // Vérifier si l'insertion a réussi (result peut varier selon le driver/ORM)
    // Pour mysql2, result est un objet OkPacket, ResultSetHeader, etc.
    // On suppose ici que si aucune erreur n'est levée, c'est un succès.
    // Idéalement, on vérifierait result.insertId ou result.affectedRows si disponible et pertinent.

    const newPage = {
      // @ts-ignore
      id: result.insertId, // Si la base de données retourne l'ID
      title,
      slug,
      content,
      featured_image,
      status: 'published',
      createdAt: new Date().toISOString(), // Peut être récupéré de la DB si nécessaire
      updatedAt: new Date().toISOString(), // Peut être récupéré de la DB si nécessaire
    };

    return NextResponse.json({ message: 'Article créé avec succès !', page: newPage }, { status: 201 });

  } catch (error) {
    console.error('Erreur lors de la création de l\'article (API):', error);
    if (connection) {
      await connection.end();
    }
    let errorMessage = 'Une erreur est survenue sur le serveur lors de la création de l\'article.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: 'Erreur interne du serveur.', details: errorMessage }, { status: 500 });
  }
}

// Optionnel : GET pour récupérer tous les articles (si nécessaire pour l'admin)
// export async function GET(request: NextRequest) {
//   let connection;
//   try {
//     connection = await getDbConnection();
//     const [rows] = await connection.query("SELECT id, title, slug, image_url, status, created_at, updated_at FROM blog_posts ORDER BY created_at DESC");
//     await connection.end();
//     return NextResponse.json(rows, { status: 200 });
//   } catch (error) {
//     console.error('Erreur lors de la récupération des articles (API):', error);
//     if (connection) {
//       await connection.end();
//     }
//     return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
//   }
// }
