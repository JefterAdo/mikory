import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomImage from "./ui/CustomImage";

// Interface pour les articles de blog (identique à celle de app/blog/page.tsx)
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  createdAt: string; // ou Date, selon ce que l'API retourne
  // Ajoutez d'autres champs si nécessaire, comme 'category' ou 'slug'
}

// Formater la date (peut être mis dans un utilitaire)
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Idéalement, votre API supporterait un paramètre comme &limit=3&sortBy=createdAt:desc
        // Sinon, récupérez tous les articles publiés et triez/slicez côté client.
        const response = await fetch('/api/blog/posts?status=published');
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Erreur lors de la récupération des articles');
        }

        const allPublishedPosts: BlogPost[] = result.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt || 'Aucun extrait disponible.',
          featuredImage: article.featured_image, // Assurez-vous que ce champ correspond à votre API
          createdAt: article.created_at,
        })); 

        // Triez par date de création (plus récent d'abord) et prenez les 3 premiers
        const recentPosts = allPublishedPosts
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 3);

        setPosts(recentPosts);
      } catch (err: any) {
        console.error("Erreur chargement articles pour page d'accueil:", err);
        setError(err.message || "Impossible de charger les actualités.");
        setPosts([]); // Assurez-vous que posts est vide en cas d'erreur
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-12 text-center">
          Blog & Actualités
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {error && (
          <p className="text-center text-red-400 py-10">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-gray-400 py-10">Aucune actualité à afficher pour le moment.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-mikory-dark rounded-lg border border-gray-800 flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link href={`/blog/${post.id}`} className="block h-48 w-full relative">
                  {post.featuredImage ? (
                    <CustomImage
                      src={post.featuredImage}
                      alt={`Image pour l'article : ${post.title}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={80}
                      containerClassName="h-full w-full"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-800 flex items-center justify-center">
                      <span className="text-gray-400">Image non disponible</span>
                    </div>
                  )}
                </Link>
                {!post.featuredImage && (
                   <div className="h-48 w-full bg-gray-700 flex items-center justify-center text-gray-500">
                    Image non disponible
                   </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-gray-400 text-sm mb-2">{formatDate(post.createdAt)}</div>
                  <Link href={`/blog/${post.id}`} className="block mb-2">
                    <h3 className="text-xl font-semibold text-white hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-primary font-bold hover:underline mt-auto self-start"
                  >
                    Lire la suite &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
