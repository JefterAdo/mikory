"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiArrowLeft, HiPencil, HiTrash, HiCalendar, HiUser, HiTag } from "react-icons/hi";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  status: "published" | "draft" | "review";
  date: string;
  author: string;
  category: string;
  tags: string[];
  featuredImage: string | null;
}

export default function ViewBlogPost() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  // Simuler le chargement des données de l'article
  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      // Données factices pour l'article
      const fakePost: BlogPost = {
        id: parseInt(id),
        title: "Lancement de notre nouvelle offre de services",
        content: `
          <p>Nous sommes ravis de vous annoncer le lancement de notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.</p>
          <h2>Une approche innovante</h2>
          <p>Notre équipe a travaillé sans relâche pour développer des solutions qui répondent aux défis actuels du marché. Avec notre nouvelle offre, nous proposons :</p>
          <ul>
            <li>Des stratégies digitales personnalisées</li>
            <li>Un accompagnement sur mesure</li>
            <li>Des outils d'analyse performants</li>
            <li>Une expertise technique de pointe</li>
          </ul>
          <h2>Pour qui ?</h2>
          <p>Ces services s'adressent aux entreprises de toutes tailles, des startups aux grandes entreprises, qui souhaitent accélérer leur transformation digitale et maximiser leur impact en ligne.</p>
          <p>N'hésitez pas à nous contacter pour en savoir plus sur comment nous pouvons vous aider à atteindre vos objectifs.</p>
        `,
        excerpt: "Découvrez notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.",
        status: "published",
        date: "2025-05-15",
        author: "admin@mikory.io",
        category: "Actualités",
        tags: ["Services", "Innovation", "Digital"],
        featuredImage: "/images/blog-image-1.jpg"
      };

      setPost(fakePost);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // Gérer la suppression d'un article
  const handleDelete = () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      // Simuler la suppression
      router.push("/admin/blog");
      // Ici, nous ajouterions l'appel API pour supprimer l'article
    }
  };

  // Fonction pour obtenir la classe de couleur en fonction du statut
  const getStatusClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "review":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Fonction pour obtenir le libellé en français du statut
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "published":
        return "Publié";
      case "draft":
        return "Brouillon";
      case "review":
        return "En révision";
      default:
        return status;
    }
  };

  return (
    <ClientOnly>
      <AuthGuard>
        <div className="min-h-screen bg-black">
          <Sidebar />
          
          <main className="md:ml-64 transition-all duration-300 min-h-screen">
            {/* Header */}
            <header className="bg-mikory-dark border-b border-gray-800 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center">
                <Link 
                  href="/admin/blog"
                  className="mr-4 text-gray-400 hover:text-white transition-colors"
                >
                  <HiArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-heading font-bold text-white">
                  {loading ? "Chargement..." : post?.title}
                </h1>
              </div>
              {!loading && post && (
                <div className="flex items-center space-x-3">
                  <Link 
                    href={`/admin/blog/${id}/edit`}
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <HiPencil className="mr-2" />
                    Modifier
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <HiTrash className="mr-2" />
                    Supprimer
                  </button>
                </div>
              )}
            </header>

            {/* Contenu de l'article */}
            <div className="p-4 md:p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : post ? (
                <div className="bg-mikory-dark/50 rounded-lg overflow-hidden">
                  {/* Image à la une */}
                  {post.featuredImage && (
                    <div className="w-full h-64 md:h-80 relative">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Métadonnées */}
                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-400">
                      <span className={`px-2 py-1 inline-flex items-center rounded-full text-xs font-semibold ${getStatusClass(post.status)}`}>
                        {getStatusLabel(post.status)}
                      </span>
                      <span className="flex items-center">
                        <HiCalendar className="mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <HiUser className="mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <HiTag className="mr-1" />
                        {post.category}
                      </span>
                    </div>
                    
                    {/* Extrait */}
                    <div className="mb-6 text-gray-300 italic border-l-4 border-primary pl-4 py-2">
                      {post.excerpt}
                    </div>
                    
                    {/* Contenu */}
                    <div 
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                    
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="mt-8 pt-4 border-t border-gray-800">
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Tags:</h3>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-mikory-dark/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-lg">Article non trouvé.</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
