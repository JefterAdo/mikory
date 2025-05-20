import { NextRequest, NextResponse } from 'next/server';
import { executeQuery } from '@/lib/db';

// Fonction pour générer le sitemap XML dynamiquement
export async function GET(request: NextRequest) {
  try {
    // Récupérer tous les articles publiés
    const postsQuery = `
      SELECT id, slug, title, updated_at 
      FROM blog_posts 
      WHERE status = 'published'
    `;
    const posts = await executeQuery({ query: postsQuery, values: [] });
    
    // Récupérer toutes les pages publiées
    const pagesQuery = `
      SELECT slug, updated_at 
      FROM pages 
      WHERE published = true
    `;
    const pages = await executeQuery({ query: pagesQuery, values: [] });
    
    // Construire l'URL de base
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mikory.com';
    
    // Créer le XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    
    // Ajouter la page d'accueil
    xml += `
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
    `;
    
    // Ajouter la page blog
    xml += `
      <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `;
    
    // Ajouter les articles de blog
    if (Array.isArray(posts)) {
      posts.forEach((post: any) => {
        const slug = post.slug || post.id;
        const lastmod = post.updated_at ? new Date(post.updated_at).toISOString() : new Date().toISOString();
        
        xml += `
          <url>
            <loc>${baseUrl}/blog/${slug}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.7</priority>
          </url>
        `;
      });
    }
    
    // Ajouter les pages
    if (Array.isArray(pages)) {
      pages.forEach((page: any) => {
        const lastmod = page.updated_at ? new Date(page.updated_at).toISOString() : new Date().toISOString();
        
        xml += `
          <url>
            <loc>${baseUrl}/${page.slug}</loc>
            <lastmod>${lastmod}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>0.6</priority>
          </url>
        `;
      });
    }
    
    // Fermer le XML
    xml += '</urlset>';
    
    // Renvoyer le XML avec les en-têtes appropriés
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de la génération du sitemap' },
      { status: 500 }
    );
  }
}
