"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck } from "react-icons/hi";

interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

export default function TagsAdmin() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTag, setNewTag] = useState("");
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const router = useRouter();

  // Simuler le chargement des données
  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Données factices pour les tags
      const fakeTags: Tag[] = [
        {
          id: 1,
          name: "Services",
          slug: "services",
          postCount: 1
        },
        {
          id: 2,
          name: "Innovation",
          slug: "innovation",
          postCount: 2
        },
        {
          id: 3,
          name: "Digital",
          slug: "digital",
          postCount: 3
        },
        {
          id: 4,
          name: "Réseaux sociaux",
          slug: "reseaux-sociaux",
          postCount: 1
        },
        {
          id: 5,
          name: "Stratégie",
          slug: "strategie",
          postCount: 2
        },
        {
          id: 6,
          name: "Web design",
          slug: "web-design",
          postCount: 1
        },
        {
          id: 7,
          name: "UX/UI",
          slug: "ux-ui",
          postCount: 0
        }
      ];

      setTags(fakeTags);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Générer un slug à partir d'un nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  // Gérer l'ajout d'un tag
  const handleAddTag = () => {
    if (!newTag) return;

    const slug = generateSlug(newTag);
    const newId = Math.max(...tags.map(t => t.id), 0) + 1;
    
    const tag: Tag = {
      id: newId,
      name: newTag,
      slug,
      postCount: 0
    };

    setTags([...tags, tag]);
    setNewTag("");
  };

  // Gérer la mise à jour d'un tag
  const handleUpdateTag = () => {
    if (!editingTag || !editingTag.name) return;

    const updatedTags = tags.map(tag => 
      tag.id === editingTag.id 
        ? { ...editingTag, slug: generateSlug(editingTag.name) } 
        : tag
    );

    setTags(updatedTags);
    setEditingTag(null);
  };

  // Gérer la suppression d'un tag
  const handleDeleteTag = (id: number) => {
    const tag = tags.find(t => t.id === id);
    if (!tag) return;

    if (tag.postCount > 0) {
      if (!window.confirm(`Ce tag est utilisé par ${tag.postCount} article(s). Êtes-vous sûr de vouloir le supprimer ?`)) {
        return;
      }
    } else {
      if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce tag ?")) {
        return;
      }
    }

    setTags(tags.filter(t => t.id !== id));
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
                  <h1 className="text-2xl font-heading font-bold text-white">Tags</h1>
                </div>
                <p className="text-gray-400 text-sm mt-1">Gérez les tags de votre blog</p>
              </div>
            </header>

            {/* Contenu principal */}
            <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulaire d'ajout */}
              <div className="bg-mikory-dark/50 rounded-lg p-6 h-fit lg:sticky lg:top-6">
                <h2 className="text-lg font-semibold text-white mb-4">Ajouter un tag</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Nom *
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Nom du tag"
                      />
                      <button
                        onClick={handleAddTag}
                        disabled={!newTag}
                        className={`px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-r-lg transition-colors ${
                          !newTag ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        <HiPlus size={18} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Slug (généré automatiquement)
                    </label>
                    <input
                      type="text"
                      value={newTag ? generateSlug(newTag) : ""}
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">Conseils pour les tags :</h3>
                  <ul className="list-disc list-inside text-sm text-gray-400 space-y-1">
                    <li>Utilisez des tags courts et pertinents</li>
                    <li>Évitez les tags trop génériques</li>
                    <li>Limitez le nombre de tags par article</li>
                    <li>Utilisez des tags cohérents entre les articles</li>
                  </ul>
                </div>
              </div>

              {/* Liste des tags */}
              <div className="lg:col-span-2">
                <div className="bg-mikory-dark/50 rounded-lg overflow-hidden">
                  {loading ? (
                    <div className="flex justify-center items-center h-64">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : tags.length === 0 ? (
                    <div className="p-6 text-center">
                      <p className="text-gray-400">Aucun tag trouvé.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-800">
                        <thead className="bg-black/30">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Nom
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Slug
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Articles
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                          {tags.map((tag) => (
                            <tr key={tag.id} className="hover:bg-black/20">
                              <td className="px-6 py-4 whitespace-nowrap">
                                {editingTag?.id === tag.id ? (
                                  <input
                                    type="text"
                                    value={editingTag.name}
                                    onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
                                    className="w-full px-3 py-1 bg-black/30 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  />
                                ) : (
                                  <div className="text-sm font-medium text-white">{tag.name}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {editingTag?.id === tag.id ? (
                                  <div className="text-sm text-gray-500">{generateSlug(editingTag.name)}</div>
                                ) : (
                                  <div className="text-sm text-gray-400">{tag.slug}</div>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link href={`/admin/blog?tag=${tag.slug}`} className="text-sm text-primary hover:text-mikory-red-light">
                                  {tag.postCount} article{tag.postCount !== 1 ? "s" : ""}
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                {editingTag?.id === tag.id ? (
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      onClick={handleUpdateTag}
                                      className="text-green-500 hover:text-green-400"
                                      disabled={!editingTag.name}
                                    >
                                      <HiCheck className="h-5 w-5" />
                                    </button>
                                    <button
                                      onClick={() => setEditingTag(null)}
                                      className="text-gray-500 hover:text-gray-400"
                                    >
                                      <HiX className="h-5 w-5" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex justify-end space-x-2">
                                    <button
                                      onClick={() => setEditingTag(tag)}
                                      className="text-blue-500 hover:text-blue-400"
                                    >
                                      <HiPencil className="h-5 w-5" />
                                    </button>
                                    <button
                                      onClick={() => handleDeleteTag(tag.id)}
                                      className="text-red-500 hover:text-red-400"
                                    >
                                      <HiTrash className="h-5 w-5" />
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
