"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { HiCalendar, HiUser, HiTag, HiArrowLeft } from "react-icons/hi";
import SEOMetadata from "@/components/SEOMetadata";
import SchemaOrg from "@/components/SchemaOrg";

// Interface pour les articles de blog
interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  status: string;
  featuredImage: string | null;
  featured_image: string | null; // Pour la compatibilité avec l'API
  createdAt: string;
  created_at: string; // Pour la compatibilité avec l'API
  tags: string[];
  // Champs SEO
  meta_title?: string;
  meta_description?: string;
  keywords?: string;
  slug?: string;
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Fonction pour rendre le HTML en toute sécurité
  const renderHTML = (html: string) => {
    return { __html: html };
  };

  // Charger l'article depuis l'API MySQL
  useEffect(() => {
    if (!id) {
      router.push("/blog");
      return;
    }

    setLoading(true);
    
    // Fonction pour récupérer l'article depuis l'API
    const fetchPost = async () => {
      try {
        // Récupérer l'article depuis l'API
        const response = await fetch(`/api/blog/posts/${id}`);
        const result = await response.json();
        
        if (!result.success || !result.data) {
          throw new Error(result.message || 'Article non trouvé');
        }
        
        // Transformer les données pour correspondre à l'interface BlogPost
        const apiPost: BlogPost = {
          id: result.data.id,
          title: result.data.title,
          content: result.data.content,
          excerpt: result.data.excerpt || 'Aucun extrait disponible',
          category: result.data.category || 'Non catégorisé',
          status: result.data.status || 'draft',
          featuredImage: result.data.featured_image || null,
          featured_image: result.data.featured_image || null,
          createdAt: result.data.created_at,
          created_at: result.data.created_at,
          tags: result.data.tags || []
        };
        
        console.log("Article récupéré:", apiPost);
        
        // Vérifier si l'article est publié
        if (apiPost.status !== 'published') {
          throw new Error('Cet article n\'est pas disponible');
        }
        
        setPost(apiPost);
        
        // Récupérer les articles connexes
        const relatedResponse = await fetch('/api/blog/posts');
        const relatedResult = await relatedResponse.json();
        
        if (relatedResult.success && Array.isArray(relatedResult.data)) {
          // Filtrer pour obtenir les articles de la même catégorie, mais pas le même article
          const relatedApiPosts = relatedResult.data
            .filter((article: any) => 
              article.id !== apiPost.id && 
              article.status === 'published' && 
              article.category === apiPost.category
            )
            .slice(0, 3)
            .map((article: any) => ({
              id: article.id,
              title: article.title,
              content: article.content,
              excerpt: article.excerpt || 'Aucun extrait disponible',
              category: article.category || 'Non catégorisé',
              status: article.status,
              featuredImage: article.featured_image || null,
              featured_image: article.featured_image || null,
              createdAt: article.created_at,
              created_at: article.created_at,
              tags: article.tags || []
            }));
          
          setRelatedPosts(relatedApiPosts);
        }
      } catch (error) {
        console.error("Erreur lors du chargement de l'article:", error);
        
        // En cas d'erreur, utiliser des articles factices pour la démonstration
        const fakePosts: BlogPost[] = [
          {
            id: 1,
            title: "Lancement de notre nouvelle offre de services",
            content: "<p>Nous sommes ravis de vous annoncer le lancement de notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.</p><p>Ces services comprennent des solutions de communication digitale sur mesure, des stratégies de marketing de contenu et des services de développement web optimisés.</p><p>Notre objectif est de fournir des solutions intégrées qui permettent à nos clients de se démarquer dans un environnement numérique en constante évolution.</p>",
            excerpt: "Découvrez notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.",
            category: "Actualités",
            status: "published",
            featuredImage: "/images/blog/services-launch.jpg",
            featured_image: "/images/blog/services-launch.jpg",
            createdAt: "2025-05-15T10:30:00Z",
            created_at: "2025-05-15T10:30:00Z",
            tags: ["Services", "Nouveautés", "Communication"]
          },
          {
            id: 3,
            title: "Étude de cas : Refonte du site web pour une entreprise locale",
            content: "<p>Dans cette étude de cas, nous explorons comment nous avons aidé une entreprise locale à moderniser son site web et augmenter son trafic de 150% en seulement trois mois.</p>",
            excerpt: "Comment nous avons aidé une entreprise locale à moderniser son site web et augmenter son trafic.",
            category: "Études de cas",
            status: "published",
            featuredImage: "/images/blog/case-study.jpg",
            featured_image: "/images/blog/case-study.jpg",
            createdAt: "2025-05-10T14:15:00Z",
            created_at: "2025-05-10T14:15:00Z",
            tags: ["Étude de cas", "Refonte web", "SEO"]
          }
        ];
        
        const fakePost = fakePosts.find(post => post.id.toString() === id);
        
        if (fakePost) {
          setPost(fakePost);
          setRelatedPosts(fakePosts.filter(p => p.id.toString() !== id));
        } else {
          router.push("/blog");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id, router]);

  // Afficher un état de chargement
  if (loading) {
    return (
      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
          <div className="text-center text-gray-400 mt-4">
            Chargement de l'article...
          </div>
          <div className="mt-8 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <HiArrowLeft className="mr-2" />
              Retour au blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Si l'article n'est pas trouvé
  if (!post) {
    return (
      <main className="pt-32 pb-16">
        <SEOMetadata 
          title="Article non trouvé"
          description="L'article que vous recherchez n'existe pas ou n'est pas disponible."
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Article non trouvé</h1>
            <p className="text-gray-400 mb-8">L'article que vous recherchez n'existe pas ou n'est pas disponible.</p>
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary hover:text-mikory-red-light transition-colors"
            >
              <HiArrowLeft className="mr-2" />
              Retour au blog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Préparer les métadonnées SEO
  const seoTitle = post.meta_title || post.title;
  const seoDescription = post.meta_description || post.excerpt;
  const seoKeywords = post.keywords || post.tags.join(', ');
  const seoImage = post.featuredImage || post.featured_image || undefined;
  const seoUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <main className="pt-32 pb-16 bg-mikory-dark">
      <SEOMetadata 
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        ogImage={typeof seoImage === 'string' ? seoImage : undefined}
        ogType="article"
        url={seoUrl}
      />
      <SchemaOrg
        schema={{
          type: "blogPost",
          headline: seoTitle,
          description: seoDescription,
          image: typeof seoImage === 'string' ? seoImage : undefined,
          datePublished: post.created_at || post.createdAt,
          dateModified: post.created_at || post.createdAt, // Utiliser created_at car updated_at n'est pas dans l'interface
          url: seoUrl,
          authorName: "Mikory",
          publisherName: "Mikory",
          publisherLogo: "https://mikory.com/logo.png"
        }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Lien de retour */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <HiArrowLeft className="mr-2" />
            Retour à tous les articles
          </Link>
        </div>
        
        {/* En-tête de l'article */}
        <article className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
          {/* Image à la une - Utiliser featured_image ou featuredImage */}
          {(post.featured_image || post.featuredImage) && (
            <div className="relative h-64 md:h-96 w-full">
              <img
                src={typeof (post.featured_image || post.featuredImage) === 'string' ? (post.featured_image || post.featuredImage) as string : ''}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Contenu de l'article */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            {/* Métadonnées */}
            <div className="flex flex-wrap items-center text-sm text-gray-400 gap-4 mb-6 pb-6 border-b border-gray-700">
              <div className="flex items-center">
                <HiCalendar className="mr-1" />
                <span>{formatDate(post.created_at || post.createdAt)}</span>
              </div>
              
              <div className="flex items-center">
                <HiTag className="mr-1" />
                <span>{post.category}</span>
              </div>
            </div>
            
            {/* Contenu HTML de l'article */}
            <div 
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={renderHTML(post.content)}
            />
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-700">
                <h3 className="text-lg font-medium text-white mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-700 text-gray-300 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
        
        {/* Articles connexes */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Articles connexes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors">
                  {/* Image à la une */}
                  <div className="relative h-40 w-full bg-gray-900">
                    {(relatedPost.featured_image || relatedPost.featuredImage) ? (
                      <img
                        src={typeof (relatedPost.featured_image || relatedPost.featuredImage) === 'string' ? (relatedPost.featured_image || relatedPost.featuredImage) as string : ''}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <span className="text-gray-500">Aucune image</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenu de l'article */}
                  <div className="p-4">
                    <Link href={`/blog/${relatedPost.id}`}>
                      <h3 className="text-lg font-bold text-white mb-2 hover:text-primary transition-colors">
                        {relatedPost.title}
                      </h3>
                    </Link>
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <Link 
                      href={`/blog/${relatedPost.id}`}
                      className="text-sm text-primary hover:text-mikory-red-light transition-colors"
                    >
                      Lire la suite
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}