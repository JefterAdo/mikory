"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CampagnesSocialMedia() {
  const avantages = [
    {
      title: "Stratégie Social Media",
      description:
        "Développement d'une stratégie social media sur-mesure pour atteindre vos objectifs de visibilité et d'engagement.",
    },
    {
      title: "Création de Contenu",
      description:
        "Production de contenus engageants et adaptés à chaque plateforme pour maximiser votre impact digital.",
    },
    {
      title: "Gestion de Communauté",
      description:
        "Animation et modération de vos communautés pour créer des relations durables avec votre audience.",
    },
    {
      title: "Analyse & Optimisation",
      description:
        "Suivi des performances et optimisation continue de vos campagnes pour des résultats toujours plus performants.",
    },
  ];

  const etapes = [
    {
      numero: "01",
      titre: "Audit & Stratégie",
      description:
        "Analyse de votre présence actuelle et définition d'une stratégie social media alignée avec vos objectifs business.",
    },
    {
      numero: "02",
      titre: "Planification",
      description:
        "Élaboration d'un calendrier éditorial et planification des campagnes pour une présence optimale sur les réseaux.",
    },
    {
      numero: "03",
      titre: "Création & Publication",
      description:
        "Production de contenus créatifs et gestion de leur publication sur les différentes plateformes.",
    },
    {
      numero: "04",
      titre: "Suivi & Reporting",
      description:
        "Analyse des performances et ajustements stratégiques pour maximiser l'impact de vos campagnes.",
    },
  ];

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
              Campagnes Social Media
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Boostez votre présence sur les réseaux sociaux avec des campagnes
              créatives et engageantes qui captent l'attention de votre
              audience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-primary mb-6">
                Une présence sociale qui fait la différence
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Dans un monde où les réseaux sociaux sont devenus
                incontournables, une présence stratégique et créative est
                essentielle pour vous démarquer et créer une véritable connexion
                avec votre audience.
              </p>
              <p className="text-gray-300 text-lg">
                Notre équipe de spécialistes en social media combine créativité
                et expertise pour développer des campagnes qui non seulement
                attirent l'attention, mais génèrent également des résultats
                concrets pour votre entreprise.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Pourquoi investir dans une stratégie social media ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Augmentation de votre visibilité en ligne
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Renforcement de votre image de marque
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Création d'une communauté engagée
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Génération de leads qualifiés
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avantages Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Notre Approche
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Une méthodologie créative pour maximiser votre impact social
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {avantages.map((avantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {avantage.title}
                </h3>
                <p className="text-gray-300">{avantage.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Notre Processus
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Un accompagnement stratégique pour des résultats concrets
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {etapes.map((etape, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {etape.numero}
                </div>
                <div className="p-6 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {etape.titre}
                  </h3>
                  <p className="text-gray-300">{etape.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-primary mb-6">
              Prêt à booster votre présence sur les réseaux sociaux ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation gratuite et découvrez comment
              nous pouvons transformer votre présence sociale en véritable atout
              business.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/demarrer-un-projet">
                <button className="bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
                  Démarrer un Projet
                </button>
              </Link>
              <Link href="/contact">
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-md font-semibold hover:bg-primary/10 transition-all duration-300">
                  Nous Contacter
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
