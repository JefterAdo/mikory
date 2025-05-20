"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiPlus, HiPencil, HiTrash, HiX, HiCheck } from "react-icons/hi";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  // Simuler le chargement des données
  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      // Données factices pour les catégories
      const fakeCategories: Category[] = [
        {
          id: 1,
          name: "Actualités",
          slug: "actualites",
          description: "Dernières nouvelles et mises à jour de Mikory",
          postCount: 2
        },
        {
          id: 2,
          name: "Marketing",
          slug: "marketing",
          description: "Conseils et stratégies de marketing digital",
          postCount: 2
        },
        {
          id: 3,
          name: "Études de cas",
          slug: "etudes-de-cas",
          description: "Exemples concrets de projets réalisés",
          postCount: 1
        },
        {
          id: 4,
          name: "Contenu",
          slug: "contenu",
          description: "Stratégies de contenu et rédaction web",
          postCount: 1
        },
        {
          id: 5,
          name: "SEO",
          slug: "seo",
          description: "Optimisation pour les moteurs de recherche",
          postCount: 1
        }
      ];

      setCategories(fakeCategories);
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

  // Gérer l'ajout d'une catégorie
  const handleAddCategory = () => {
    if (!newCategory.name) return;

    const slug = generateSlug(newCategory.name);
    const newId = Math.max(...categories.map(c => c.id), 0) + 1;
    
    const category: Category = {
      id: newId,
      name: newCategory.name,
      slug,
      description: newCategory.description,
      postCount: 0
    };

    setCategories([...categories, category]);
    setNewCategory({ name: "", description: "" });
    setIsAdding(false);
  };

  // Gérer la mise à jour d'une catégorie
  const handleUpdateCategory = () => {
    if (!editingCategory || !editingCategory.name) return;

    const updatedCategories = categories.map(cat => 
      cat.id === editingCategory.id 
        ? { ...editingCategory, slug: generateSlug(editingCategory.name) } 
        : cat
    );

    setCategories(updatedCategories);
    setEditingCategory(null);
  };

  // Gérer la suppression d'une catégorie
  const handleDeleteCategory = (id: number) => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return;

    if (category.postCount > 0) {
      if (!window.confirm(`Cette catégorie contient ${category.postCount} article(s). Êtes-vous sûr de vouloir la supprimer ?`)) {
        return;
      }
    } else {
      if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")) {
        return;
      }
    }

    setCategories(categories.filter(cat => cat.id !== id));
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
                  <h1 className="text-2xl font-heading font-bold text-white">Catégories</h1>
                </div>
                <p className="text-gray-400 text-sm mt-1">Gérez les catégories de votre blog</p>
              </div>
              <button
                onClick={() => setIsAdding(true)}
                className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors border border-primary shadow-md"
              >
                <HiPlus className="mr-2 text-primary" />
                <span className="text-primary font-medium">Nouvelle catégorie</span>
              </button>
            </header>

            {/* Contenu principal */}
            <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Formulaire d'ajout */}
              {isAdding && (
                <div className="p-4 bg-gray-900/80 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white mb-4 pb-2 border-b border-gray-800">Ajouter une catégorie</h2>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <HiX size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Nom *
                      </label>
                      <input
                        type="text"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                        className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Nom de la catégorie"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Slug (généré automatiquement)
                      </label>
                      <input
                        type="text"
                        value={generateSlug(newCategory.name)}
                        className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Description
                      </label>
                      <textarea
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                        className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Description de la catégorie"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setIsAdding(false)}
                      className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors mr-2"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleAddCategory}
                      disabled={!newCategory.name}
                      className={`px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-r-lg transition-colors shadow-md ${
                        !newCategory.name ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <HiPlus size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Liste des catégories */}
              <div className="bg-mikory-dark rounded-lg p-6 h-fit lg:sticky lg:top-6 border border-gray-800 shadow-lg">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : categories.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-400">Aucune catégorie trouvée.</p>
                    <button
                      onClick={() => setIsAdding(true)}
                      className="mt-4 px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-lg transition-colors"
                    >
                      Ajouter une catégorie
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-800">
                      <thead className="bg-black/50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Nom
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Slug
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                            Description
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
                        {categories.map((category) => (
                          <tr key={category.id} className="hover:bg-black/20">
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingCategory?.id === category.id ? (
                                <input
                                  type="text"
                                  value={editingCategory.name}
                                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                  className="w-full px-3 py-1 bg-black/30 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                              ) : (
                                <div className="text-sm font-medium text-white">{category.name}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {editingCategory?.id === category.id ? (
                                <div className="text-sm text-gray-500">{generateSlug(editingCategory.name)}</div>
                              ) : (
                                <div className="text-sm text-gray-400">{category.slug}</div>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              {editingCategory?.id === category.id ? (
                                <textarea
                                  value={editingCategory.description}
                                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                  className="w-full px-3 py-1 bg-black/30 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                  rows={2}
                                />
                              ) : (
                                <div className="text-sm text-gray-300 max-w-xs truncate">{category.description}</div>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link href={`/admin/blog?category=${category.slug}`} className="text-sm text-primary hover:text-mikory-red-light">
                                {category.postCount} article{category.postCount !== 1 ? "s" : ""}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {editingCategory?.id === category.id ? (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={handleUpdateCategory}
                                    className="text-green-500 hover:text-green-400"
                                    disabled={!editingCategory.name}
                                  >
                                    <HiCheck className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => setEditingCategory(null)}
                                    className="text-gray-500 hover:text-gray-400"
                                  >
                                    <HiX className="h-5 w-5" />
                                  </button>
                                </div>
                              ) : (
                                <div className="flex justify-end space-x-2">
                                  <button
                                    onClick={() => setEditingCategory(category)}
                                    className="text-blue-500 hover:text-blue-400"
                                  >
                                    <HiPencil className="h-5 w-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCategory(category.id)}
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
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
