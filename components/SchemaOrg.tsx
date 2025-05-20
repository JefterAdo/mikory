"use client";

import { useEffect } from "react";

// Types pour les différents schémas
interface WebsiteSchema {
  type: "website";
  name: string;
  url: string;
  description?: string;
  image?: string;
}

interface BlogPostSchema {
  type: "blogPost";
  headline: string;
  description?: string;
  image?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  url?: string;
}

interface BreadcrumbSchema {
  type: "breadcrumb";
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface OrganizationSchema {
  type: "organization";
  name: string;
  url: string;
  logo?: string;
  description?: string;
  sameAs?: string[];
}

type SchemaType = WebsiteSchema | BlogPostSchema | BreadcrumbSchema | OrganizationSchema;

export default function SchemaOrg({ schema }: { schema: SchemaType }) {
  useEffect(() => {
    // Supprimer tout script schema.org existant
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Créer un nouvel élément script
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    
    // Générer le contenu JSON-LD en fonction du type de schéma
    let jsonLdObject: any = {};
    
    switch (schema.type) {
      case "website":
        jsonLdObject = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": schema.name,
          "url": schema.url,
          "description": schema.description,
          "image": schema.image
        };
        break;
        
      case "blogPost":
        jsonLdObject = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": schema.headline,
          "description": schema.description,
          "image": schema.image,
          "datePublished": schema.datePublished,
          "dateModified": schema.dateModified,
          "author": {
            "@type": "Person",
            "name": schema.authorName || "Mikory"
          },
          "publisher": {
            "@type": "Organization",
            "name": schema.publisherName || "Mikory",
            "logo": {
              "@type": "ImageObject",
              "url": schema.publisherLogo || "https://mikory.com/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": schema.url
          }
        };
        break;
        
      case "breadcrumb":
        const itemListElement = schema.items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }));
        
        jsonLdObject = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": itemListElement
        };
        break;
        
      case "organization":
        jsonLdObject = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": schema.name,
          "url": schema.url,
          "logo": schema.logo,
          "description": schema.description,
          "sameAs": schema.sameAs
        };
        break;
    }
    
    // Supprimer les propriétés undefined
    const cleanObject = (obj: any) => {
      Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          cleanObject(obj[key]);
        }
      });
      return obj;
    };
    
    // Définir le contenu du script
    script.textContent = JSON.stringify(cleanObject(jsonLdObject));
    
    // Ajouter le script au document
    document.head.appendChild(script);
    
    // Nettoyage lors du démontage du composant
    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);
  
  // Ce composant ne rend rien visuellement
  return null;
}
