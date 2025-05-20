"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TiptapEditor from "@/components/admin/TiptapEditor"; // Assurez-vous que le chemin est correct
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

// TODO: Implémenter la logique de sauvegarde de la page

export default function NewAdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Assurez-vous que TiptapEditor est monté côté client uniquement
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Le titre et le contenu ne peuvent pas être vides.");
      return;
    }
    setIsLoading(true);

    let uploadedImageUrl: string | null = null;

    try {
      // 1. Upload image if selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const imageUploadResponse = await fetch('/api/upload/image', {
          method: 'POST',
          body: formData,
        });

        const imageUploadResult = await imageUploadResponse.json();
        if (imageUploadResponse.ok && imageUploadResult.success) {
          uploadedImageUrl = imageUploadResult.url;
          setImageUrl(uploadedImageUrl); // Store for display or other uses if needed
        } else {
          alert(`Erreur lors de l'upload de l'image: ${imageUploadResult.message || 'Erreur inconnue'}`);
          setIsLoading(false);
          return;
        }
      }

      // 2. Save page/article data (including image URL if uploaded)
      const payload: { title: string; content: string; featured_image?: string } = {
        title,
        content,
      };
      if (uploadedImageUrl) {
        payload.featured_image = uploadedImageUrl;
      }

      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Page sauvegardée avec succès !");
        router.push("/admin/pages"); // Rediriger vers la liste des pages
      } else {
        console.error("Erreur lors de la sauvegarde de la page (client):", result);
        alert(`Erreur: ${result.error || 'Impossible de sauvegarder la page.'} ${result.details || ''}`);
      }
    } catch (error) {
      console.error("Erreur de communication avec l'API:", error);
      alert("Une erreur de communication est survenue. Vérifiez la console.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-mikory-gray text-white">
      <div className="mb-6">
        <Link href="/admin/pages" className="text-primary hover:underline inline-flex items-center">
          <HiArrowLeft className="mr-2" />
          Retour à la liste des pages
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-6">Créer une nouvelle page</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-mikory-dark-gray p-8 rounded-lg shadow">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Titre de la page
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-mikory-black border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-white"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            Contenu de la page
          </label>
          {isClient && (
            <TiptapEditor
              value={content}
              onChange={setContent}
            />
          )}
          {!isClient && <div className="h-64 bg-mikory-black rounded-md flex items-center justify-center text-gray-500">Chargement de l'éditeur...</div>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">
            Image de couverture (optionnel)
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark cursor-pointer"
          />
          {imageUrl && (
            <div className="mt-4">
              <p className="text-sm text-gray-400">Image téléversée :</p>
              <img src={imageUrl} alt="Aperçu de l'image téléversée" className="max-w-xs max-h-48 mt-2 rounded" />
            </div>
          )}
          {imageFile && !imageUrl && (
             <div className="mt-4">
              <p className="text-sm text-gray-400">Image sélectionnée :</p>
              <img src={URL.createObjectURL(imageFile)} alt="Aperçu de l'image sélectionnée" className="max-w-xs max-h-48 mt-2 rounded" />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-150 disabled:opacity-50"
          >
            {isLoading ? "Sauvegarde en cours..." : "Sauvegarder la page"}
          </button>
        </div>
      </form>
    </div>
  );
}
