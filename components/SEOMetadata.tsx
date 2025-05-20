"use client";

import Head from "next/head";
import { useEffect } from "react";

interface SEOMetadataProps {
  title: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  url?: string;
}

export default function SEOMetadata({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  url,
}: SEOMetadataProps) {
  // Utiliser useEffect pour manipuler le document head
  // car Next.js 14 ne prend plus en charge le composant Head de la même manière
  useEffect(() => {
    // Mettre à jour le titre de la page
    document.title = `${title} | Mikory`;

    // Mettre à jour les balises meta existantes ou en créer de nouvelles
    updateOrCreateMetaTag("description", description || "");
    updateOrCreateMetaTag("keywords", keywords || "");
    
    // Open Graph
    updateOrCreateMetaTag("og:title", title);
    updateOrCreateMetaTag("og:description", description || "");
    updateOrCreateMetaTag("og:type", ogType);
    if (ogImage) updateOrCreateMetaTag("og:image", ogImage);
    if (url) updateOrCreateMetaTag("og:url", url);
    
    // Twitter Card
    updateOrCreateMetaTag("twitter:card", "summary_large_image");
    updateOrCreateMetaTag("twitter:title", title);
    updateOrCreateMetaTag("twitter:description", description || "");
    if (ogImage) updateOrCreateMetaTag("twitter:image", ogImage);
    
    // Nettoyage lors du démontage du composant
    return () => {
      // Pas besoin de nettoyer car les balises meta seront mises à jour
      // par le prochain montage du composant
    };
  }, [title, description, keywords, ogImage, ogType, url]);

  // Fonction pour mettre à jour ou créer une balise meta
  const updateOrCreateMetaTag = (name: string, content: string) => {
    // Chercher une balise meta existante avec ce nom ou cette propriété
    let metaTag = document.querySelector(`meta[name="${name}"]`) || 
                  document.querySelector(`meta[property="${name}"]`);
    
    // Si la balise n'existe pas, la créer
    if (!metaTag) {
      metaTag = document.createElement("meta");
      // Déterminer si c'est une propriété Open Graph ou Twitter
      if (name.startsWith("og:") || name.startsWith("twitter:")) {
        metaTag.setAttribute("property", name);
      } else {
        metaTag.setAttribute("name", name);
      }
      document.head.appendChild(metaTag);
    }
    
    // Mettre à jour le contenu
    metaTag.setAttribute("content", content);
  };

  // Ce composant ne rend rien visuellement
  return null;
}
