"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiPlus, HiPencil, HiTrash, HiEye, HiFilter, HiSearch } from "react-icons/hi";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  status: "published" | "draft" | "review";
  date: string;
  author: string;
  category: string;
}

export default function BlogAdmin() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const router = useRouter();

  // Charger les articles depuis l'API MySQL
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    // Fonction pour charger les articles
    const fetchPosts = async () => {
      try {
        // Appeler l'API pour récupérer tous les articles
        const response = await fetch('/api/blog/posts');
        const result = await response.json();
        
        if (!result.success) {
          throw new Error(result.message || 'Erreur lors de la récupération des articles');
        }
        
        // Transformer les articles pour correspondre à l'interface BlogPost
        const savedPosts = result.data.map((article: any) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt || 'Aucun extrait disponible',
          status: article.status || 'draft',
          date: new Date(article.created_at).toISOString().split('T')[0],
          author: 'admin@mikory.io',
          category: article.category || 'Non catégorisé'
        }));
        
        // Si des articles ont été trouvés, les utiliser directement
        if (savedPosts.length > 0) {
          setPosts(savedPosts);
          setLoading(false);
          return;
        }
        
        // Si aucun article n'a été trouvé, utiliser des données factices
        timer = setTimeout(() => {
          // Données factices pour les articles
          const fakePosts: BlogPost[] = [
            {
              id: 1,
              title: "Lancement de notre nouvelle offre de services",
              excerpt: "Découvrez notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.",
              status: "published",
              date: "2025-05-15",
              author: "admin@mikory.io",
              category: "Actualités"
            },
            {
              id: 2,
              title: "Comment optimiser votre présence sur les réseaux sociaux",
              excerpt: "Conseils et astuces pour améliorer votre visibilité sur les plateformes sociales.",
              status: "draft",
              date: "2025-05-14",
              author: "admin@mikory.io",
              category: "Marketing"
            },
            {
              id: 3,
              title: "Étude de cas : Refonte du site web pour une entreprise locale",
              excerpt: "Comment nous avons aidé une entreprise locale à moderniser son site web et augmenter son trafic.",
              status: "published",
              date: "2025-05-10",
              author: "admin@mikory.io",
              category: "Études de cas"
            },
            {
              id: 4,
              title: "Les tendances du marketing digital en 2025",
              excerpt: "Découvrez les tendances qui façonneront le paysage du marketing digital cette année.",
              status: "review",
              date: "2025-05-08",
              author: "admin@mikory.io",
              category: "Marketing"
            },
            {
              id: 5,
              title: "L'importance d'une stratégie de contenu cohérente",
              excerpt: "Comment développer une stratégie de contenu qui renforce votre marque et engage votre audience.",
              status: "published",
              date: "2025-05-05",
              author: "admin@mikory.io",
              category: "Contenu"
            },
            {
              id: 6,
              title: "Les meilleures pratiques SEO pour 2025",
              excerpt: "Optimisez votre référencement avec ces techniques éprouvées et à jour.",
              status: "draft",
              date: "2025-05-03",
              author: "admin@mikory.io",
              category: "SEO"
            },
          ];

          setPosts(fakePosts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
        
        // En cas d'erreur, utiliser des données factices après un délai
        timer = setTimeout(() => {
          const fakePosts: BlogPost[] = [
            {
              id: 1,
              title: "Lancement de notre nouvelle offre de services",
              excerpt: "Découvrez notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.",
              status: "published",
              date: "2025-05-15",
              author: "admin@mikory.io",
              category: "Actualités"
            },
            // Autres articles factices...
          ];
          
          setPosts(fakePosts);
          setLoading(false);
        }, 1000);
      }
    };
    
    // Appeler la fonction pour charger les articles
    fetchPosts();

    // Nettoyer le timer si nécessaire
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  // Filtrer les articles en fonction des critères de recherche et des filtres
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Obtenir les catégories uniques pour le filtre
  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category)))];

  // Gérer la suppression d'un article
  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      // Simuler la suppression
      setPosts(posts.filter(post => post.id !== id));
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
            {/* Bouton Nouvel article fixe pour mobile */}
            <div className="fixed top-4 right-4 z-50 md:hidden">
              <Link 
                href="/admin/blog/new"
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-bold shadow-lg"
              >
                <HiPlus className="mr-2" size={20} />
                Nouvel article
              </Link>
            </div>
            
            {/* Header */}
            <header className="bg-mikory-dark border-b border-gray-800 p-4 md:p-6 pt-16 md:pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-30">
              <h1 className="text-2xl font-heading font-bold text-white">Articles de blog</h1>
              <div className="hidden md:block">
                <Link 
                  href="/admin/blog/new"
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-bold"
                >
                  <HiPlus className="mr-2" size={20} />
                  Nouvel article
                </Link>
              </div>
            </header>

            {/* Filtres et recherche */}
            <div className="p-4 md:p-6 bg-mikory-dark border-b border-gray-800">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiSearch className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Rechercher un article..."
                      className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-40">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HiFilter className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        className="w-full pl-10 pr-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="published">Publiés</option>
                        <option value="draft">Brouillons</option>
                        <option value="review">En révision</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-40">
                    <select
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <option value="all">Toutes catégories</option>
                      {categories.filter(cat => cat !== "all").map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des articles */}
            <div className="p-4 md:p-6 pt-24">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="bg-mikory-dark/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-lg">Aucun article ne correspond à vos critères de recherche.</p>
                </div>
              ) : (
                <div className="bg-mikory-dark/50 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-black/30">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Titre
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Catégorie
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Statut
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Auteur
                          </th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {filteredPosts.map((post) => (
                          <tr key={post.id} className="hover:bg-black/20">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-col">
                                <div className="text-sm font-medium text-white">{post.title}</div>
                                <div className="text-sm text-gray-400 truncate max-w-xs">{post.excerpt}</div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-300">{post.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(post.status)}`}>
                                {getStatusLabel(post.status)}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {post.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {post.author}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link 
                                  href={`/admin/blog/${post.id}`}
                                  className="text-primary hover:text-mikory-red-light"
                                >
                                  <HiEye className="h-5 w-5" />
                                </Link>
                                <Link 
                                  href={`/admin/blog/${post.id}/edit`}
                                  className="text-blue-500 hover:text-blue-400"
                                >
                                  <HiPencil className="h-5 w-5" />
                                </Link>
                                <button 
                                  onClick={() => handleDelete(post.id)}
                                  className="text-red-500 hover:text-red-400"
                                >
                                  <HiTrash className="h-5 w-5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
