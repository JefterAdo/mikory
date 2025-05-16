"use client";
import React from "react";
import Image from "next/image";

const partners = [
  {
    name: "CFPCR MCC",
    logo: "/images/Partenaires/CFPCR MCC.jpg",
  },
  {
    name: "Tedx Yamoussokro",
    logo: "/images/Partenaires/Tedx Yamoussokro.png",
  },
  {
    name: "Tedx Bouaké",
    logo: "/images/Partenaires/Tedx Bouaké.png",
  },
  {
    name: "Association des Blogueurs de Côte d'Ivoire",
    logo: "/images/Partenaires/Association des Blogueurs de Côte d'Ivoire.png",
  },
  {
    name: "MINHAS",
    logo: "/images/Partenaires/logo-MINHAS.png",
  },
  {
    name: "MCF",
    logo: "/images/Partenaires/LOGO-MCF-PNG-e1716123768273.png",
  },
  {
    name: "Beraka Entreprises",
    logo: "/images/Partenaires/Beraka Entreprises.jpg",
  },
  {
    name: "RICOM",
    logo: "/images/Partenaires/RICOM.png",
  },
  {
    name: "Afrika Transtour",
    logo: "/images/Partenaires/logo_afrika_transtour.webp",
  },
  {
    name: "CIE",
    logo: "/images/Partenaires/Logo_CIE.jpg",
  },
];

export default function Partners() {
  return (
    <section className="py-20 bg-mikory-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">
          Nos Partenaires
        </h2>
        <p className="text-gray-300 text-lg mb-12 text-center max-w-3xl mx-auto">
          Ils nous font confiance pour développer leur communication et leur
          visibilité.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex justify-center items-center rounded-lg p-2 hover:bg-white/10 transition-colors duration-300 border border-gray-700"
            >
              <div className="relative h-24 w-full bg-white rounded-md p-2 flex items-center justify-center">
                <Image
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
