import { NextRequest, NextResponse } from 'next/server';
import { executeQuery, testConnection } from '@/lib/db';
import { generateSlug, generateExcerpt } from '@/lib/utils'; // Importer generateSlug et generateExcerpt

// GET - Récupérer tous les articles ou filtrer par statut/catégorie
export async function GET(request: NextRequest) {
  try {
    // Tester la connexion à la base de données
    await testConnection();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    let query = 'SELECT * FROM blog_posts';
    const values: any[] = [];
    
    // Ajouter des filtres si nécessaire
    if (status || category) {
      query += ' WHERE';
      
      if (status) {
        query += ' status = ?';
        values.push(status);
      }
      
      if (status && category) {
        query += ' AND';
      }
      
      if (category) {
        query += ' category = ?';
        values.push(category);
      }
    }
    
    // Trier par date de création (plus récent en premier)
    query += ' ORDER BY created_at DESC';
    
    console.log('Exécution de la requête SQL:', query, values);
    const posts = await executeQuery({ query, values });
    
    // Pour chaque article, récupérer ses tags
    const postsWithTags = await Promise.all(
      Array.isArray(posts) ? posts.map(async (post: any) => {
        const tagsQuery = `
          SELECT t.name
          FROM blog_tags t
          JOIN blog_post_tags pt ON t.id = pt.tag_id
          WHERE pt.post_id = ?
        `;
        const tags = await executeQuery({ query: tagsQuery, values: [post.id] });
        
        return {
          ...post,
          tags: Array.isArray(tags) ? tags.map((tag: any) => tag.name) : []
        };
      }) : []
    );
    
    return NextResponse.json({ success: true, data: postsWithTags });
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des articles:', error);
    if (error instanceof Error) {
      console.error('Stack Trace (GET /api/blog/posts):', error.stack);
    }
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la récupération des articles', 
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}

// POST - Créer un nouvel article
export async function POST(request: NextRequest) {
  try {
    // Tester la connexion à la base de données
    await testConnection();
    
    const body = await request.json();
    console.log('Données reçues dans l\'API POST:', body);
    
    const { title, content, excerpt, category, status, featured_image, tags, meta_title, meta_description, keywords } = body;
    
    // Générer le slug à partir du titre mais ne pas l'utiliser dans la requête SQL
    // car le champ n'existe pas encore dans la base de données
    const slug = generateSlug(title);
    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Impossible de générer un slug pour cet article (vérifiez le titre).' },
        { status: 400 }
      );
    }
    
    // Note: Le slug sera utilisé dans une future mise à jour du schéma

    // Validation des données
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Le titre et le contenu sont obligatoires' },
        { status: 400 }
      );
    }
    
    // Insérer l'article dans la base de données
    console.log('Insertion dans la base de données avec les valeurs:', {
      title, slug, content, excerpt, category, status, featured_image, meta_title, meta_description, keywords
    });
    
    const insertPostQuery = `
      INSERT INTO blog_posts 
      (title, slug, content, excerpt, category, status, featured_image, meta_title, meta_description, keywords)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const postResult = await executeQuery({
      query: insertPostQuery,
      values: [
        title, 
        slug,
        content, 
        excerpt || '', 
        category || '', 
        status || 'draft', 
        featured_image || null,
        meta_title || title, // Utiliser le titre de l'article si meta_title n'est pas fourni
        meta_description || (excerpt ? excerpt : generateExcerpt(content)), // Utiliser l'extrait ou un extrait généré du contenu
        keywords || ''
      ]
    });
    
    console.log('Résultat de l\'insertion:', postResult);
    
    // Récupérer l'ID de l'article inséré
    const postId = (postResult as any).insertId;
    
    // Si des tags sont fournis, les ajouter
    if (tags && Array.isArray(tags) && tags.length > 0) {
      for (const tag of tags) {
        // Vérifier si le tag existe déjà
        const existingTag = await executeQuery({
          query: 'SELECT id FROM blog_tags WHERE name = ?',
          values: [tag]
        });
        
        let tagId;
        
        if (Array.isArray(existingTag) && existingTag.length > 0) {
          // Si le tag existe, utiliser son ID
          tagId = existingTag[0].id;
        } else {
          // Sinon, créer un nouveau tag
          const newTag = await executeQuery({
            query: 'INSERT INTO blog_tags (name) VALUES (?)',
            values: [tag]
          });
          tagId = (newTag as any).insertId;
        }
        
        // Associer le tag à l'article
        await executeQuery({
          query: 'INSERT INTO blog_post_tags (post_id, tag_id) VALUES (?, ?)',
          values: [postId, tagId]
        });
      }
    }
    
    // Récupérer l'article complet avec ses tags
    const post = await executeQuery({
      query: 'SELECT * FROM blog_posts WHERE id = ?',
      values: [postId]
    });
    
    const tagsQuery = `
      SELECT t.name
      FROM blog_tags t
      JOIN blog_post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `;
    const postTags = await executeQuery({ query: tagsQuery, values: [postId] });
    
    const postWithTags = {
      ...Array.isArray(post) ? post[0] : {},
      tags: Array.isArray(postTags) ? postTags.map((tag: any) => tag.name) : []
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article créé avec succès', 
      data: postWithTags 
    });
  } catch (error) {
    console.error('Erreur détaillée lors de la création de l\'article:', error);
    if (error instanceof Error) {
      console.error('Stack Trace (POST /api/blog/posts):', error.stack);
    }
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erreur lors de la création de l\'article', 
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}