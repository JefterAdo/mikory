"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiArrowLeft, HiSave, HiEye, HiPhotograph, HiX } from "react-icons/hi";

import dynamic from 'next/dynamic';

// Import dynamique de notre éditeur Tiptap pour éviter les erreurs de rendu côté serveur
const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), { ssr: false });

// Utilisation de notre composant TiptapEditor personnalisé
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return <TiptapEditor value={value} onChange={onChange} />;
};

export default function NewBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [status, setStatus] = useState<"draft" | "published" | "review">("draft");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [newTag, setNewTag] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Nouveaux états pour les champs SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [keywords, setKeywords] = useState(""); // Pourrait être un tableau de chaînes si on veut des tags pour les keywords
  const router = useRouter();

  // Catégories factices
  const categories = [
    "Actualités",
    "Marketing",
    "Études de cas",
    "Contenu",
    "SEO",
    "Réseaux sociaux",
    "Développement web"
  ];

  // Simuler l'enregistrement d'un article
  const handleSave = async () => {
    if (!title) {
      alert("Veuillez saisir un titre pour l'article.");
      return;
    }

    setSaving(true);

    try {
      // Préparer les données de l'article pour l'API
      const articleData = {
        title,
        content,
        excerpt,
        category,
        tags,
        status,
        featured_image: featuredImage, // Utiliser featured_image pour correspondre au nom du champ dans la base de données
        // Inclure les champs SEO maintenant supportés par le schéma
        meta_title: metaTitle || title, // Utiliser le titre de l'article si meta_title n'est pas fourni
        meta_description: metaDescription || excerpt, // Utiliser l'extrait si meta_description n'est pas fourni
        keywords: keywords
      };

      console.log('Données de l\'article à envoyer (avec SEO):', articleData);

      // Envoyer les données à l'API
      const response = await fetch('/api/blog/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      const result = await response.json();
      console.log('Réponse de l\'API:', result);
      
      if (!result.success) {
        throw new Error(result.message || 'Erreur lors de l\'enregistrement de l\'article');
      }
      
      console.log('Article enregistré avec succès:', result.data);

      // Rediriger vers la liste des articles
      router.push("/admin/blog");
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      alert("Une erreur s'est produite lors de l'enregistrement de l'article.");
    } finally {
      setSaving(false);
    }
  };

  // Gérer l'ajout d'un tag
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  // Gérer la suppression d'un tag
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Référence à l'input file caché
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gérer l'upload d'une image
  const handleImageUpload = () => {
    // Déclencher le clic sur l'input file caché
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Gérer le changement de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide (JPG, PNG, GIF, etc.).');
      return;
    }

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop volumineuse. La taille maximale est de 5 Mo.');
      return;
    }

    // Créer une URL pour prévisualiser l'image
    const imageUrl = URL.createObjectURL(file);
    setFeaturedImage(imageUrl);

    // Dans une application réelle, vous enverriez l'image à votre serveur ici
    // et récupéreriez l'URL de l'image stockée
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
                <h1 className="text-2xl font-heading font-bold text-white">Nouvel article</h1>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setPreviewMode(!previewMode)}
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <HiEye className="mr-2" />
                  {previewMode ? "Éditer" : "Aperçu"}
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !title}
                  className={`flex items-center px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-lg transition-colors ${
                    saving || !title ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <HiSave className="mr-2" />
                      Enregistrer
                    </>
                  )}
                </button>
              </div>
            </header>

            {previewMode ? (
              <div className="p-4 md:p-6 pt-24">
                <div className="bg-mikory-dark/50 rounded-lg p-6">
                  <h1 className="text-3xl font-bold text-white mb-4">{title || "Titre de l'article"}</h1>
                  {featuredImage && (
                    <div className="mb-6 rounded-lg overflow-hidden">
                      <img src={featuredImage} alt={title} className="w-full h-auto" />
                    </div>
                  )}
                  <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: content || "<p>Contenu de l'article...</p>" }} />
                </div>
              </div>
            ) : (
              <div className="p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Colonne principale */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Titre */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                      Titre de l'article *
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Saisissez le titre de votre article"
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Contenu */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Contenu de l'article
                    </label>
                    <div className="mb-4">
                      <p className="text-sm text-gray-400 mb-2">Utilisez la barre d'outils de l'éditeur ci-dessous pour mettre en forme votre contenu.</p>
                    </div>
                    <RichTextEditor value={content} onChange={setContent} />
                  </div>

                  {/* Extrait */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-300 mb-2">
                      Extrait
                    </label>
                    <textarea
                      id="excerpt"
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      placeholder="Saisissez un court extrait de votre article (utilisé dans les aperçus)"
                      rows={4}
                      className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Section SEO */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4 border-b border-gray-700 pb-2">Optimisation SEO</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-300 mb-2">
                          Meta Titre
                        </label>
                        <input
                          type="text"
                          name="metaTitle"
                          id="metaTitle"
                          value={metaTitle}
                          onChange={(e) => setMetaTitle(e.target.value)}
                          placeholder="Titre optimisé pour les moteurs de recherche (max 60 caractères recommandés)"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-300 mb-2">
                          Meta Description
                        </label>
                        <textarea
                          id="metaDescription"
                          name="metaDescription"
                          rows={3}
                          value={metaDescription}
                          onChange={(e) => setMetaDescription(e.target.value)}
                          placeholder="Description concise pour les moteurs de recherche (max 160 caractères recommandés)"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label htmlFor="keywords" className="block text-sm font-medium text-gray-300 mb-2">
                          Mots-clés (séparés par des virgules)
                        </label>
                        <input
                          type="text"
                          name="keywords"
                          id="keywords"
                          value={keywords}
                          onChange={(e) => setKeywords(e.target.value)}
                          placeholder="ex: marketing digital, SEO, contenu web"
                          className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Barre latérale */}
                <div className="space-y-6">
                  {/* Statut */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Statut</h3>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={status === "draft"}
                          onChange={() => setStatus("draft")}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-300">Brouillon</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={status === "review"}
                          onChange={() => setStatus("review")}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-300">En révision</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          checked={status === "published"}
                          onChange={() => setStatus("published")}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-300">Publié</span>
                      </label>
                    </div>
                  </div>

                  {/* Catégorie */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Catégorie</h3>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Tags</h3>
                    <div className="flex mb-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Ajouter un tag"
                        className="flex-1 px-4 py-2 bg-black/30 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <button
                        onClick={handleAddTag}
                        className="px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-r-lg transition-colors"
                      >
                        Ajouter
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-800 text-white"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-2 text-gray-400 hover:text-white"
                          >
                            <HiX size={14} />
                          </button>
                        </span>
                      ))}
                      {tags.length === 0 && (
                        <span className="text-gray-400 text-sm">Aucun tag ajouté</span>
                      )}
                    </div>
                  </div>

                  {/* Image à la une */}
                  <div className="bg-mikory-dark/50 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-white mb-4">Image à la une</h3>
                    {/* Input file caché */}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />
                    {featuredImage ? (
                      <div className="relative">
                        <img
                          src={featuredImage}
                          alt="Image à la une"
                          className="w-full h-auto rounded-lg"
                        />
                        <button
                          onClick={() => setFeaturedImage(null)}
                          className="absolute top-2 right-2 p-1 bg-black/70 rounded-full text-white hover:bg-red-500 transition-colors"
                        >
                          <HiX size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <button
                          onClick={handleImageUpload}
                          className="w-full py-12 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                        >
                          <HiPhotograph size={36} className="mb-2" />
                          <span>Ajouter une image à la une</span>
                        </button>
                        <p className="text-xs text-gray-500 text-center">Formats acceptés : JPG, PNG, GIF. Taille max : 5 Mo</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
