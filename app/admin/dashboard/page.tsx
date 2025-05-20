"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiDocumentText, HiPhotograph, HiUserGroup, HiCog, HiEye, HiPlus } from "react-icons/hi";

export default function AdminDashboard() {
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);
  const [stats, setStats] = useState({
    posts: 0,
    media: 0,
    users: 0,
    comments: 0
  });

  const [isMounted, setIsMounted] = useState(false);

  // Marquer le composant comme monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Ne rien faire si nous ne sommes pas encore montés côté client
    if (!isMounted) return;
    
    // Récupérer les informations de l'utilisateur
    const authData = localStorage.getItem("mikory_admin_auth");
    if (authData) {
      try {
        const { user } = JSON.parse(authData);
        setUser(user);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
      }
    }

    // Simuler le chargement des statistiques
    const timer = setTimeout(() => {
      setStats({
        posts: 12,
        media: 48,
        users: 5,
        comments: 27
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [isMounted]);

  // Données factices pour les articles récents
  const recentPosts = [
    { id: 1, title: "Lancement de notre nouvelle offre de services", status: "published", date: "2025-05-15" },
    { id: 2, title: "Comment optimiser votre présence sur les réseaux sociaux", status: "draft", date: "2025-05-14" },
    { id: 3, title: "Étude de cas : Refonte du site web pour une entreprise locale", status: "published", date: "2025-05-10" },
    { id: 4, title: "Les tendances du marketing digital en 2025", status: "review", date: "2025-05-08" }
  ];

  // Données factices pour les activités récentes
  const recentActivities = [
    { id: 1, action: "Nouvel utilisateur inscrit", user: "client@example.com", date: "2025-05-16 14:32" },
    { id: 2, action: "Article publié", user: "admin@mikory.io", date: "2025-05-15 10:15" },
    { id: 3, action: "Nouveau commentaire", user: "visiteur@example.com", date: "2025-05-14 18:45" },
    { id: 4, action: "Média ajouté", user: "admin@mikory.io", date: "2025-05-13 09:30" }
  ];

  return (
    <ClientOnly>
      <AuthGuard>
        <div className="min-h-screen bg-black">
          <Sidebar />
          
          <main className="md:ml-64 transition-all duration-300 min-h-screen">
            {/* Header */}
            <header className="bg-mikory-dark border-b border-gray-800 p-4 md:p-6 flex justify-between items-center">
              <h1 className="text-2xl font-heading font-bold text-white">Tableau de bord</h1>
              <div className="flex items-center space-x-4">
                <Link 
                  href="/"
                  target="_blank"
                  className="hidden md:flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <HiEye className="mr-1" />
                  Voir le site
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {user?.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm text-white">{user?.email}</p>
                    <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </header>

            {/* Content */}
            <div className="p-4 md:p-6 pt-24 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-mikory-dark/50 border border-gray-800 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary mr-4">
                    <HiDocumentText size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Articles</p>
                    <p className="text-white text-2xl font-bold">{stats.posts}</p>
                  </div>
                </div>
                <div className="bg-mikory-dark/50 border border-gray-800 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 mr-4">
                    <HiPhotograph size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Médias</p>
                    <p className="text-white text-2xl font-bold">{stats.media}</p>
                  </div>
                </div>
                <div className="bg-mikory-dark/50 border border-gray-800 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 mr-4">
                    <HiUserGroup size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Utilisateurs</p>
                    <p className="text-white text-2xl font-bold">{stats.users}</p>
                  </div>
                </div>
                <div className="bg-mikory-dark/50 border border-gray-800 rounded-lg p-4 flex items-center">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/20 flex items-center justify-center text-yellow-500 mr-4">
                    <HiCog size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Commentaires</p>
                    <p className="text-white text-2xl font-bold">{stats.comments}</p>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent posts */}
                <div className="lg:col-span-2 bg-mikory-dark/50 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-white">Articles récents</h2>
                    <Link 
                      href="/admin/blog/new" 
                      className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                    >
                      <HiPlus className="mr-1" size={16} /> Nouvel article
                    </Link>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-900/50">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Titre</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        {recentPosts.map((post) => (
                          <tr key={post.id} className="hover:bg-gray-900/30">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <p className="text-sm text-white">{post.title}</p>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                post.status === 'published' ? 'bg-green-100 text-green-800' :
                                post.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.status === 'published' ? 'Publié' :
                                 post.status === 'draft' ? 'Brouillon' : 'En révision'}
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">
                              {new Date(post.date).toLocaleDateString('fr-FR')}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                              <Link href={`/admin/blog/edit/${post.id}`} className="text-primary hover:text-mikory-red-light">
                                Modifier
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 border-t border-gray-800 text-center">
                    <Link href="/admin/blog" className="text-sm text-primary hover:text-mikory-red-light">
                      Voir tous les articles
                    </Link>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="bg-mikory-dark/50 border border-gray-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold text-white">Activité récente</h2>
                  </div>
                  <div className="p-4">
                    <ul className="space-y-4">
                      {recentActivities.map((activity) => (
                        <li key={activity.id} className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                          <p className="text-white text-sm">{activity.action}</p>
                          <div className="flex justify-between mt-1">
                            <p className="text-gray-400 text-xs">{activity.user}</p>
                            <p className="text-gray-400 text-xs">{activity.date}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
