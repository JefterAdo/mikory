"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiCheck, HiX, HiEye, HiTrash, HiPencil, HiReply } from "react-icons/hi";

interface Comment {
  id: number;
  author: string;
  email: string;
  content: string;
  postId: number;
  postTitle: string;
  date: string;
  status: "approved" | "pending" | "spam";
}

export default function CommentsAdmin() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "approved" | "pending" | "spam">("all");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const router = useRouter();

  // Simuler le chargement des données
  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Données factices pour les commentaires
      const fakeComments: Comment[] = [
        {
          id: 1,
          author: "Jean Dupont",
          email: "jean.dupont@example.com",
          content: "Excellent article, merci pour ces informations précieuses !",
          postId: 1,
          postTitle: "Lancement de notre nouvelle offre de services",
          date: "2025-05-16 14:32",
          status: "approved"
        },
        {
          id: 2,
          author: "Marie Martin",
          email: "marie.martin@example.com",
          content: "J'aimerais en savoir plus sur vos services de marketing digital. Pouvez-vous me contacter ?",
          postId: 1,
          postTitle: "Lancement de notre nouvelle offre de services",
          date: "2025-05-15 10:15",
          status: "approved"
        },
        {
          id: 3,
          author: "Pierre Leroy",
          email: "pierre.leroy@example.com",
          content: "Je ne suis pas d'accord avec certains points de cet article. Voici pourquoi...",
          postId: 2,
          postTitle: "Comment optimiser votre présence sur les réseaux sociaux",
          date: "2025-05-14 18:45",
          status: "pending"
        },
        {
          id: 4,
          author: "Sophie Bernard",
          email: "sophie.bernard@example.com",
          content: "Votre étude de cas est très intéressante. J'ai moi-même travaillé sur un projet similaire.",
          postId: 3,
          postTitle: "Étude de cas : Refonte du site web pour une entreprise locale",
          date: "2025-05-13 09:30",
          status: "approved"
        },
        {
          id: 5,
          author: "spam.bot@spam.com",
          email: "spam.bot@spam.com",
          content: "Check out our amazing products at discount prices! Click here: [link removed]",
          postId: 4,
          postTitle: "Les tendances du marketing digital en 2025",
          date: "2025-05-12 22:15",
          status: "spam"
        }
      ];

      setComments(fakeComments);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filtrer les commentaires
  const filteredComments = comments.filter(comment => {
    if (filter === "all") return true;
    return comment.status === filter;
  });

  // Gérer le changement de statut d'un commentaire
  const handleStatusChange = (id: number, newStatus: "approved" | "pending" | "spam") => {
    const updatedComments = comments.map(comment => 
      comment.id === id ? { ...comment, status: newStatus } : comment
    );
    setComments(updatedComments);
  };

  // Gérer la suppression d'un commentaire
  const handleDeleteComment = (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      return;
    }
    setComments(comments.filter(comment => comment.id !== id));
  };

  // Gérer la réponse à un commentaire
  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return;

    // Simuler l'ajout d'une réponse
    const newId = Math.max(...comments.map(c => c.id), 0) + 1;
    const commentToReplyTo = comments.find(c => c.id === commentId);
    
    if (!commentToReplyTo) return;
    
    const newComment: Comment = {
      id: newId,
      author: "Admin",
      email: "admin@mikory.io",
      content: replyContent,
      postId: commentToReplyTo.postId,
      postTitle: commentToReplyTo.postTitle,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5),
      status: "approved"
    };

    setComments([...comments, newComment]);
    setReplyingTo(null);
    setReplyContent("");
  };

  // Obtenir le nombre de commentaires par statut
  const commentCounts = {
    all: comments.length,
    approved: comments.filter(c => c.status === "approved").length,
    pending: comments.filter(c => c.status === "pending").length,
    spam: comments.filter(c => c.status === "spam").length
  };

  return (
    <ClientOnly>
      <AuthGuard>
        <div className="min-h-screen bg-black">
          <Sidebar />
          
          <main className="md:ml-64 transition-all duration-300 min-h-screen">
            {/* Header */}
            <header className="bg-mikory-dark border-b border-gray-800 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Link href="/admin/blog" className="text-gray-400 hover:text-white">
                    Articles
                  </Link>
                  <span className="text-gray-600">/</span>
                  <h1 className="text-2xl font-heading font-bold text-white">Commentaires</h1>
                </div>
                <p className="text-gray-400 text-sm mt-1">Gérez les commentaires de votre blog</p>
              </div>
            </header>

            {/* Filtres */}
            <div className="bg-mikory-dark border-b border-gray-800 p-4">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "all" 
                      ? "bg-gray-700 text-white" 
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Tous ({commentCounts.all})
                </button>
                <button
                  onClick={() => setFilter("approved")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "approved" 
                      ? "bg-green-700 text-white" 
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Approuvés ({commentCounts.approved})
                </button>
                <button
                  onClick={() => setFilter("pending")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "pending" 
                      ? "bg-yellow-700 text-white" 
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  En attente ({commentCounts.pending})
                </button>
                <button
                  onClick={() => setFilter("spam")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filter === "spam" 
                      ? "bg-red-700 text-white" 
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  Spam ({commentCounts.spam})
                </button>
              </div>
            </div>

            {/* Liste des commentaires */}
            <div className="p-4 md:p-6">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : filteredComments.length === 0 ? (
                <div className="bg-mikory-dark/50 rounded-lg p-8 text-center">
                  <p className="text-gray-400 text-lg">Aucun commentaire {filter !== "all" ? `avec le statut "${filter}"` : ""} trouvé.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredComments.map((comment) => (
                    <div key={comment.id} className="bg-mikory-dark/50 rounded-lg overflow-hidden border border-gray-800">
                      <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row justify-between md:items-center gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">{comment.author}</span>
                            <span className="text-sm text-gray-400">({comment.email})</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Sur <Link href={`/admin/blog/${comment.postId}`} className="text-primary hover:text-mikory-red-light">{comment.postTitle}</Link> • {comment.date}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {comment.status === "approved" ? (
                            <span className="px-2 py-1 bg-green-900/30 text-green-500 text-xs rounded">Approuvé</span>
                          ) : comment.status === "pending" ? (
                            <span className="px-2 py-1 bg-yellow-900/30 text-yellow-500 text-xs rounded">En attente</span>
                          ) : (
                            <span className="px-2 py-1 bg-red-900/30 text-red-500 text-xs rounded">Spam</span>
                          )}
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-white">{comment.content}</p>
                      </div>
                      <div className="p-4 bg-black/20 border-t border-gray-800 flex flex-wrap gap-2">
                        {comment.status !== "approved" && (
                          <button
                            onClick={() => handleStatusChange(comment.id, "approved")}
                            className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
                          >
                            <HiCheck className="mr-1" /> Approuver
                          </button>
                        )}
                        {comment.status !== "pending" && (
                          <button
                            onClick={() => handleStatusChange(comment.id, "pending")}
                            className="flex items-center px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded text-sm"
                          >
                            <HiX className="mr-1" /> Mettre en attente
                          </button>
                        )}
                        {comment.status !== "spam" && (
                          <button
                            onClick={() => handleStatusChange(comment.id, "spam")}
                            className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm"
                          >
                            <HiX className="mr-1" /> Marquer comme spam
                          </button>
                        )}
                        <button
                          onClick={() => setReplyingTo(comment.id)}
                          className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                        >
                          <HiReply className="mr-1" /> Répondre
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="flex items-center px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                        >
                          <HiTrash className="mr-1" /> Supprimer
                        </button>
                      </div>
                      {replyingTo === comment.id && (
                        <div className="p-4 bg-gray-900 border-t border-gray-800">
                          <h3 className="text-sm font-medium text-white mb-2">Répondre à {comment.author}</h3>
                          <textarea
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
                            placeholder="Votre réponse..."
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => setReplyingTo(null)}
                              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                            >
                              Annuler
                            </button>
                            <button
                              onClick={() => handleReply(comment.id)}
                              disabled={!replyContent.trim()}
                              className={`px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-lg transition-colors ${
                                !replyContent.trim() ? "opacity-50 cursor-not-allowed" : ""
                              }`}
                            >
                              Envoyer
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
