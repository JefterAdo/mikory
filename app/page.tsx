"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Realisations from "@/components/Realisations";
import Process from "@/components/Process";
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import SEOMetadata from "@/components/SEOMetadata";
import SchemaOrg from "@/components/SchemaOrg";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SEOMetadata 
        title="Mikory - Agence de communication digitale"
        description="Mikory est une agence de communication digitale spécialisée dans la création de sites web, le marketing digital et la stratégie de contenu."
        keywords="agence digitale, communication digitale, marketing digital, création de site web, stratégie de contenu, réseaux sociaux"
        ogType="website"
      />
      <SchemaOrg
        schema={{
          type: "organization",
          name: "Mikory",
          url: "https://mikory.com",
          logo: "https://mikory.com/logo.png",
          description: "Mikory est une agence de communication digitale spécialisée dans la création de sites web, le marketing digital et la stratégie de contenu.",
          sameAs: [
            "https://www.facebook.com/mikory",
            "https://twitter.com/mikory",
            "https://www.linkedin.com/company/mikory",
            "https://www.instagram.com/mikory"
          ]
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Realisations />
      <Process />
      <Stats />
      <Partners />
      <Blog />
      <FAQ />
      <Newsletter />
    </main>
  );
}
