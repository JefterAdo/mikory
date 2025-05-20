import React from "react";
import CustomImage from "./ui/CustomImage";

const projects = [
  {
    image: "/images/home/image-1.jpg",
    title: "Stratégie Digitale",
    description:
      "Conception et mise en œuvre de stratégies digitales innovantes pour nos clients.",
  },
  {
    image: "/images/home/image-3.jpg",
    title: "Création Visuelle",
    description:
      "Des visuels impactants pour renforcer l'identité de marque et attirer l'attention.",
  },
  {
    image: "/images/home/image-4.jpg",
    title: "Développement Web",
    description:
      "Sites web modernes, performants et adaptés à tous les supports.",
  },
  {
    image: "/images/home/image-6.jpg",
    title: "Campagnes Social Media",
    description: "Gestion et animation de communautés sur les réseaux sociaux.",
  },
  {
    image: "/images/home/image-7.jpg",
    title: "Accompagnement & Conseil",
    description:
      "Un suivi personnalisé pour garantir la réussite de chaque projet.",
  },
];

export default function Projects() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Nos Réalisations
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-primary transition-colors duration-300"
            >
              <div className="w-full h-64">
                <CustomImage
                  src={project.image}
                  alt={`Projet : ${project.title} - ${project.description}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx < 3}
                  quality={80}
                  loading={idx < 3 ? 'eager' : 'lazy'}
                  containerClassName="h-full w-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
