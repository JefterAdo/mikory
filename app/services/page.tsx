"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    image: "/images/home/image-1.jpg",
    title: "Stratégie Digitale",
    description:
      "Nous concevons des stratégies digitales sur-mesure pour propulser votre marque. Analyse de marché, positionnement, plan d'action multicanal : nous vous aidons à atteindre vos objectifs business avec une vision claire et des résultats mesurables.",
    arguments: [
      "Audit de votre présence en ligne et de la concurrence",
      "Définition d'objectifs précis et de KPI",
      "Planification de campagnes digitales efficaces",
      "Accompagnement stratégique continu",
    ],
    link: "/services/strategie-digitale",
  },
  {
    image: "/images/Création visuelle.jpeg",
    title: "Création Visuelle",
    description:
      "Nous créons des identités visuelles uniques et mémorables. Du logo à la charte graphique, en passant par les supports print et digitaux, nous valorisons votre image pour marquer durablement les esprits.",
    arguments: [
      "Création de logos et chartes graphiques",
      "Design de supports de communication (flyers, affiches, etc.)",
      "Visuels pour réseaux sociaux et campagnes publicitaires",
      "Direction artistique et conseils en image",
    ],
    link: "/services/creation-visuelle",
  },
  {
    image: "/images/Code_web_dev.png",
    title: "Développement Web",
    description:
      "Sites vitrines, e-commerce, applications sur-mesure : nous développons des solutions web performantes, sécurisées et évolutives, parfaitement adaptées à vos besoins et à ceux de vos clients.",
    arguments: [
      "Conception UX/UI centrée utilisateur",
      "Développement responsive et optimisé SEO",
      "Intégration de fonctionnalités avancées",
      "Maintenance et évolutions techniques",
    ],
    link: "/services/developpement-web",
  },
  {
    image: "/images/home/image-6.jpg",
    title: "Campagnes Social Media",
    description:
      "Nous animons et développons vos communautés sur les réseaux sociaux. Création de contenus engageants, gestion de campagnes publicitaires, analyse des performances : boostez votre notoriété et votre engagement.",
    arguments: [
      "Stratégie éditoriale et calendrier de publication",
      "Création de contenus (visuels, vidéos, stories) adaptés à chaque plateforme",
      "Gestion et modération de vos comptes",
      "Reporting détaillé et recommandations d'optimisation",
    ],
    link: "/services/campagnes-social-media",
  },
  {
    image: "/images/home/image-7.jpg",
    title: "Accompagnement & Conseil",
    description:
      "Nous vous accompagnons à chaque étape de votre transformation digitale. Conseils personnalisés, formation de vos équipes, suivi de projet : bénéficiez d'un partenaire fiable et réactif pour garantir votre réussite.",
    arguments: [
      "Audit et recommandations personnalisées",
      "Formations sur les outils et bonnes pratiques digitales",
      "Suivi de projet et reporting régulier",
      "Support technique et assistance continue",
    ],
    link: "/services/accompagnement-conseil",
  },
  {
    image: "/images/home/image-4.jpg",
    title: "Formation Digitale",
    description:
      "Nous proposons des ateliers et formations pour renforcer les compétences digitales de vos équipes. Maîtrisez les outils, les réseaux sociaux, le référencement et bien plus encore pour gagner en autonomie et en efficacité.",
    arguments: [
      "Formations sur-mesure adaptées à vos besoins",
      "Ateliers pratiques et cas concrets",
      "Accompagnement post-formation",
      "Veille et mise à jour des compétences",
    ],
    link: "/services/formation-digitale",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-dark text-white">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-dark z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold text-primary mb-6">
              Nos Services
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Des solutions sur-mesure pour propulser votre présence digitale et
              atteindre vos objectifs business.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gray-800/50 p-8 rounded-lg hover:bg-gray-800 transition-colors flex flex-col"
              >
                <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {service.link ? (
                  <Link href={service.link}>
                    <h2 className="text-2xl font-bold text-primary mb-4 hover:text-primary/80 transition-colors">
                      {service.title}
                    </h2>
                  </Link>
                ) : (
                  <h2 className="text-2xl font-bold text-primary mb-4">
                    {service.title}
                  </h2>
                )}
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.arguments.map((argument, argIndex) => (
                    <li key={argIndex} className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span className="text-gray-300">{argument}</span>
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <div className="mt-auto">
                    <Link href={service.link}>
                      <button className="w-full bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                        En savoir plus
                      </button>
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
