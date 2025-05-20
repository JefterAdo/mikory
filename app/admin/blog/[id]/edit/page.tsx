"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiArrowLeft, HiSave, HiTrash, HiPhotograph, HiX } from "react-icons/hi";

import dynamic from 'next/dynamic';

// Import dynamique de notre éditeur Tiptap pour éviter les erreurs de rendu côté serveur
const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), { ssr: false });

// Utilisation de notre composant TiptapEditor personnalisé
const RichTextEditor = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return <TiptapEditor value={value} onChange={onChange} />;
};

export default function EditBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "review">("draft");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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

  // Charger les données de l'article
  useEffect(() => {
    if (!id) return;

    const timer = setTimeout(() => {
      // Simuler le chargement des données
      setTitle("Lancement de notre nouvelle offre de services");
      setContent(`
        <p>Nous sommes ravis de vous annoncer le lancement de notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.</p>
        <h2>Une approche innovante</h2>
        <p>Notre équipe a travaillé sans relâche pour développer des solutions qui répondent aux défis actuels du marché.</p>
      `);
      setExcerpt("Découvrez notre nouvelle gamme de services adaptés aux besoins des entreprises modernes.");
      setCategory("Actualités");
      setStatus("published");
      setFeaturedImage("/images/blog-image-1.jpg"); // Ajouter une image à la une par défaut
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);
  
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

  // Gérer l'enregistrement des modifications
  const handleSave = async () => {
    if (!title) {
      alert("Veuillez saisir un titre pour l'article.");
      return;
    }

    setSaving(true);

    try {
      // Simuler un délai d'enregistrement
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Dans une application réelle, vous enverriez les données à votre API
      console.log({
        id,
        title,
        content,
        excerpt,
        category,
        status
      });

      // Rediriger vers la vue de l'article
      router.push(`/admin/blog/${id}`);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
      alert("Une erreur s'est produite lors de l'enregistrement de l'article.");
    } finally {
      setSaving(false);
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
                  href={`/admin/blog/${id}`}
                  className="mr-4 text-gray-400 hover:text-white transition-colors"
                >
                  <HiArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-heading font-bold text-white">
                  {loading ? "Chargement..." : "Modifier l'article"}
                </h1>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSave}
                  disabled={saving || loading || !title}
                  className={`flex items-center px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-lg transition-colors ${
                    saving || loading || !title ? "opacity-70 cursor-not-allowed" : ""
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

            {loading ? (
              <div className="p-6 flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="p-4 md:p-6 pt-24 space-y-6">
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
                    placeholder="Saisissez un court extrait de votre article"
                    rows={4}
                    className="w-full px-4 py-3 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
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
                        type="button"
                      >
                        <HiTrash size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        onClick={handleImageUpload}
                        className="w-full py-12 border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                        type="button"
                      >
                        <HiPhotograph size={36} className="mb-2" />
                        <span>Ajouter une image à la une</span>
                      </button>
                      <p className="text-xs text-gray-500 text-center">Formats acceptés : JPG, PNG, GIF. Taille max : 5 Mo</p>
                    </div>
                  )}
                </div>
                
                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </div>
            )}
          </main>
        </div>
      </AuthGuard>
    </ClientOnly>
  );
}
