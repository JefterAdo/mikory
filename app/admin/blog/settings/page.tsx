"use client";

import { useState } from "react";
import Link from "next/link";
import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import ClientOnly from "@/utils/client-only";
import { HiSave } from "react-icons/hi";

export default function BlogSettings() {
  const [settings, setSettings] = useState({
    seo: {
      metaTitle: "Blog Mikory | Actualités et conseils en communication digitale",
      metaDescription: "Découvrez les dernières tendances en communication digitale, marketing et développement web sur le blog de Mikory.",
      ogImage: "/images/blog-og-image.jpg",
      twitterHandle: "@mikory",
      enableSitemap: true,
      enableRobotsTxt: true,
      enableCanonical: true
    },
    display: {
      postsPerPage: 10,
      showAuthor: true,
      showDate: true,
      showReadTime: true,
      showShareButtons: true,
      showRelatedPosts: true
    },
    comments: {
      enable: true,
      requireApproval: true,
      allowAnonymous: false,
      notifyOnNew: true,
      maxNested: 3
    }
  });
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Gérer la mise à jour des paramètres
  const handleSave = async () => {
    setSaving(true);
    
    // Simuler un délai d'enregistrement
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSaving(false);
    setSaved(true);
    
    // Réinitialiser le message de succès après 3 secondes
    setTimeout(() => setSaved(false), 3000);
  };

  // Gérer les changements dans les paramètres SEO
  const handleSeoChange = (field: string, value: string | boolean) => {
    setSettings({
      ...settings,
      seo: {
        ...settings.seo,
        [field]: value
      }
    });
  };

  // Gérer les changements dans les paramètres d'affichage
  const handleDisplayChange = (field: string, value: number | boolean) => {
    setSettings({
      ...settings,
      display: {
        ...settings.display,
        [field]: value
      }
    });
  };

  // Gérer les changements dans les paramètres de commentaires
  const handleCommentsChange = (field: string, value: boolean | number) => {
    setSettings({
      ...settings,
      comments: {
        ...settings.comments,
        [field]: value
      }
    });
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
                  <h1 className="text-2xl font-heading font-bold text-white">Paramètres</h1>
                </div>
                <p className="text-gray-400 text-sm mt-1">Configuration du blog et paramètres SEO</p>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`flex items-center px-4 py-2 bg-primary hover:bg-mikory-red-light text-white rounded-lg transition-colors ${
                  saving ? "opacity-70 cursor-not-allowed" : ""
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
            </header>

            {/* Message de succès */}
            {saved && (
              <div className="bg-green-900/30 border border-green-500 text-green-400 p-4 m-4 md:m-6 rounded-lg">
                Les paramètres ont été enregistrés avec succès.
              </div>
            )}

            {/* Contenu principal */}
            <div className="p-4 md:p-6 pt-24 space-y-6">
              {/* Section SEO */}
              <div className="bg-mikory-dark/50 rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Paramètres SEO</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Titre méta par défaut
                    </label>
                    <input
                      type="text"
                      value={settings.seo.metaTitle}
                      onChange={(e) => handleSeoChange("metaTitle", e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommandé : 50-60 caractères
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Description méta par défaut
                    </label>
                    <textarea
                      value={settings.seo.metaDescription}
                      onChange={(e) => handleSeoChange("metaDescription", e.target.value)}
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={3}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recommandé : 150-160 caractères
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Image Open Graph par défaut
                      </label>
                      <input
                        type="text"
                        value={settings.seo.ogImage}
                        onChange={(e) => handleSeoChange("ogImage", e.target.value)}
                        className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Compte Twitter
                      </label>
                      <input
                        type="text"
                        value={settings.seo.twitterHandle}
                        onChange={(e) => handleSeoChange("twitterHandle", e.target.value)}
                        className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.seo.enableSitemap}
                          onChange={(e) => handleSeoChange("enableSitemap", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Activer le sitemap XML</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.seo.enableRobotsTxt}
                          onChange={(e) => handleSeoChange("enableRobotsTxt", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Activer robots.txt</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.seo.enableCanonical}
                          onChange={(e) => handleSeoChange("enableCanonical", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Activer les URLs canoniques</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section Affichage */}
              <div className="bg-mikory-dark/50 rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Paramètres d'affichage</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Articles par page
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={settings.display.postsPerPage}
                      onChange={(e) => handleDisplayChange("postsPerPage", parseInt(e.target.value))}
                      className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.display.showAuthor}
                          onChange={(e) => handleDisplayChange("showAuthor", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Afficher l'auteur</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.display.showDate}
                          onChange={(e) => handleDisplayChange("showDate", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Afficher la date</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.display.showReadTime}
                          onChange={(e) => handleDisplayChange("showReadTime", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Afficher le temps de lecture</span>
                      </label>
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={settings.display.showShareButtons}
                          onChange={(e) => handleDisplayChange("showShareButtons", e.target.checked)}
                          className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                        />
                        <span className="ml-2 text-sm text-gray-300">Afficher les boutons de partage</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Section Commentaires */}
              <div className="bg-mikory-dark/50 rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-semibold text-white mb-4">Paramètres des commentaires</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={settings.comments.enable}
                        onChange={(e) => handleCommentsChange("enable", e.target.checked)}
                        className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                      />
                      <span className="ml-2 text-sm text-gray-300">Activer les commentaires</span>
                    </label>
                  </div>
                  
                  {settings.comments.enable && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6 border-l-2 border-gray-800">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.comments.requireApproval}
                            onChange={(e) => handleCommentsChange("requireApproval", e.target.checked)}
                            className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                          />
                          <span className="ml-2 text-sm text-gray-300">Nécessite approbation</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.comments.allowAnonymous}
                            onChange={(e) => handleCommentsChange("allowAnonymous", e.target.checked)}
                            className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                          />
                          <span className="ml-2 text-sm text-gray-300">Autoriser les commentaires anonymes</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={settings.comments.notifyOnNew}
                            onChange={(e) => handleCommentsChange("notifyOnNew", e.target.checked)}
                            className="rounded border-gray-700 text-primary focus:ring-primary bg-black/30"
                          />
                          <span className="ml-2 text-sm text-gray-300">Notification par email</span>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                          Niveau max de réponses
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={settings.comments.maxNested}
                          onChange={(e) => handleCommentsChange("maxNested", parseInt(e.target.value))}
                          className="w-full px-4 py-2 bg-black/30 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
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
