"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiCalendar, HiUser, HiTag } from "react-icons/hi";
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
  createdAt: string;
  tags: string[];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Catégories disponibles
  const categories = [
    "Actualités",
    "Marketing",
    "Études de cas",
    "Contenu",
    "SEO",
    "Réseaux sociaux",
    "Développement web"
  ];

  // Charger les articles depuis l'API MySQL
  useEffect(() => {
    setLoading(true);
    
    // Fonction pour charger les articles
    const fetchPosts = async () => {
      try {
        // Appeler l'API pour récupérer les articles publiés
        const response = await fetch('/api/blog/posts?status=published');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Erreur lors de la récupération des articles');
        }
        
        // Transformer les articles pour correspondre à l'interface BlogPost
        const publishedArticles = result.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          content: article.content,
          excerpt: article.excerpt || 'Aucun extrait disponible',
          category: article.category || 'Non catégorisé',
          status: article.status,
          featuredImage: article.featured_image,
          createdAt: article.created_at,
          tags: article.tags || []
        }));
        
        // Mettre à jour l'état des articles avec les données récupérées (même si vides)
        setPosts(publishedArticles);

      } catch (error: any) {
        console.error("Erreur détaillée lors du chargement des articles:", error.message || error);
        setPosts([]); // Garder vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };
    
    // Appeler la fonction pour charger les articles
    fetchPosts();
  }, []);

  // Filtrer les articles par catégorie
  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <main className="pt-32 pb-16">
      <SEOMetadata 
        title="Blog"
        description="Découvrez nos derniers articles, conseils et actualités sur la communication digitale, le marketing et le développement web."
        keywords="blog, communication digitale, marketing, développement web, SEO, réseaux sociaux"
        ogType="website"
      />
      <SchemaOrg
        schema={{
          type: "website",
          name: "Blog Mikory",
          url: typeof window !== 'undefined' ? window.location.href : 'https://mikory.com/blog',
          description: "Découvrez nos derniers articles, conseils et actualités sur la communication digitale, le marketing et le développement web."
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Blog Mikory</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez nos derniers articles, conseils et actualités sur la communication digitale, 
            le marketing et le développement web.
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === "all"
                  ? "bg-primary text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              Tous les articles
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des articles */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-center text-gray-300 py-10 text-lg">
            Aucun article publié pour le moment. Revenez bientôt !
          </p>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article key={post.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors flex flex-col">
                {/* Image à la une */}
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative h-48 w-full bg-gray-900">
                    {post.featuredImage ? (
                      <Image // Utilisation de Next/Image pour l'optimisation
                        src={post.featuredImage}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-700">
                        <span className="text-gray-400">Image non disponible</span>
                      </div>
                    )}
                  </div>
                </Link>
                {/* Contenu de l'article */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-gray-400 mb-2">
                    <HiCalendar className="mr-1.5 flex-shrink-0" />
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                  <Link href={`/blog/${post.id}`} className="block">
                    <h2 className="text-xl font-semibold text-white hover:text-primary transition-colors mb-2 leading-tight">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="mb-4">
                    <Link href={`/blog?category=${encodeURIComponent(post.category)}`} className="inline-block bg-primary/10 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-primary/20 transition-colors">
                      {post.category}
                    </Link>
                  </div>
                  <div className="mt-auto">
                    <Link 
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary font-semibold hover:text-mikory-red-light transition-colors text-sm"
                    >
                      Lire la suite &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl text-gray-300 mb-2">Aucun article trouvé</h3>
            <p className="text-gray-400">
              {selectedCategory !== "all" 
                ? `Aucun article n'est disponible dans la catégorie "${selectedCategory}".` 
                : "Aucun article n'est disponible pour le moment."}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
