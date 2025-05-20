"use client";

import Link from "next/link";
import CustomImage from "./ui/CustomImage";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-dark overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/50 to-dark/90 z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#FF000022,transparent_70%)] z-0" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="text-white">Votre Succès</span>
              <br />
              <span className="text-primary">Digital</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl">
              Mikory, votre partenaire en communication digitale en Côte
              d'Ivoire. Nous donnons vie à vos projets avec créativité et
              expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/demarrer-un-projet">
                <button className="bg-primary text-white px-8 py-4 rounded-md hover:bg-mikory-red-dark transition-all duration-300 transform hover:scale-105">
                  Démarrer un Projet
                </button>
              </Link>
              <Link href="/services">
                <button className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-md hover:border-primary hover:text-primary transition-all duration-300">
                  Nos Services
                </button>
              </Link>
            </div>
          </div>

          {/* Image/Animation */}
          <div className="hidden lg:block w-full h-[600px]">
            <CustomImage
              src="/images/hero-image.webp"
              alt="Marketing Digital et création de sites web en Côte d'Ivoire"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
              priority
              quality={85}
              loading="eager"
              disableHoverEffect
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-gray-300"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
