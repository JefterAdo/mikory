import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// GET - Récupérer un article spécifique par son ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Récupérer l'article
    const query = 'SELECT * FROM blog_posts WHERE id = ?';
    const post = await executeQuery({ query, values: [id] });
    
    if (!Array.isArray(post) || post.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    // Récupérer les tags de l'article
    const tagsQuery = `
      SELECT t.name
      FROM blog_tags t
      JOIN blog_post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `;
    const tags = await executeQuery({ query: tagsQuery, values: [id] });
    
    const postWithTags = {
      ...post[0],
      tags: Array.isArray(tags) ? tags.map((tag: any) => tag.name) : []
    };
    
    return NextResponse.json({ success: true, data: postWithTags });
  } catch (error) {
    console.error(`[API GET /api/blog/posts/${params.id}] Erreur détaillée:`, error);
    if (error instanceof Error) {
      console.error(`[API GET /api/blog/posts/${params.id}] Stack Trace:`, error.stack);
    }
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la récupération de l\'article', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// PUT - Mettre à jour un article existant
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json();
    console.log(`[API PUT /api/blog/posts/${id}] Données reçues:`, body);
    const { title, content, excerpt, category, status, featured_image, tags } = body; // Changé featuredImage en featured_image
    
    // Validation des données
    if (!title || !content) {
      return NextResponse.json(
        { success: false, message: 'Le titre et le contenu sont obligatoires' },
        { status: 400 }
      );
    }
    
    // Vérifier si l'article existe
    const existingPost = await executeQuery({
      query: 'SELECT * FROM blog_posts WHERE id = ?',
      values: [id]
    });
    
    if (!Array.isArray(existingPost) || existingPost.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    // Mettre à jour l'article
    console.log(`[API PUT /api/blog/posts/${id}] Préparation de la mise à jour avec :`, { title, content, excerpt, category, status, featured_image, id });
    const updateQuery = `
      UPDATE blog_posts
      SET title = ?, content = ?, excerpt = ?, category = ?, status = ?, featured_image = ?
      WHERE id = ?
    `;
    await executeQuery({
      query: updateQuery,
      values: [title, content, excerpt || '', category || '', status || 'draft', featured_image || null, id] // Assurer l'utilisation de featured_image
    });
    
    // Supprimer les associations de tags existantes
    await executeQuery({
      query: 'DELETE FROM blog_post_tags WHERE post_id = ?',
      values: [id]
    });
    
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
          values: [id, tagId]
        });
      }
    }
    
    // Récupérer l'article mis à jour avec ses tags
    const updatedPost = await executeQuery({
      query: 'SELECT * FROM blog_posts WHERE id = ?',
      values: [id]
    });
    
    const tagsQuery = `
      SELECT t.name
      FROM blog_tags t
      JOIN blog_post_tags pt ON t.id = pt.tag_id
      WHERE pt.post_id = ?
    `;
    const updatedTags = await executeQuery({ query: tagsQuery, values: [id] });
    
    const postWithTags = {
      ...Array.isArray(updatedPost) ? updatedPost[0] : {},
      tags: Array.isArray(updatedTags) ? updatedTags.map((tag: any) => tag.name) : []
    };
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article mis à jour avec succès', 
      data: postWithTags 
    });
  } catch (error) {
    console.error(`[API PUT /api/blog/posts/${params.id}] Erreur détaillée:`, error);
    if (error instanceof Error) {
      console.error(`[API PUT /api/blog/posts/${params.id}] Stack Trace:`, error.stack);
    }
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la mise à jour de l\'article', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// DELETE - Supprimer un article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Vérifier si l'article existe
    const existingPost = await executeQuery({
      query: 'SELECT * FROM blog_posts WHERE id = ?',
      values: [id]
    });
    
    if (!Array.isArray(existingPost) || existingPost.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Article non trouvé' },
        { status: 404 }
      );
    }
    
    // Supprimer l'article (les associations de tags seront supprimées automatiquement grâce à ON DELETE CASCADE)
    await executeQuery({
      query: 'DELETE FROM blog_posts WHERE id = ?',
      values: [id]
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Article supprimé avec succès'
    });
  } catch (error) {
    console.error(`[API DELETE /api/blog/posts/${params.id}] Erreur détaillée:`, error);
    if (error instanceof Error) {
      console.error(`[API DELETE /api/blog/posts/${params.id}] Stack Trace:`, error.stack);
    }
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la suppression de l\'article', error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
