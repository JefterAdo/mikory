"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DeveloppementWeb() {
  const avantages = [
    {
      title: "Solutions Sur-Mesure",
      description:
        "Développement de solutions web personnalisées, parfaitement adaptées à vos besoins spécifiques et à ceux de vos utilisateurs.",
    },
    {
      title: "Performance & Sécurité",
      description:
        "Applications optimisées pour la performance et la sécurité, garantissant une expérience utilisateur fluide et des données protégées.",
    },
    {
      title: "Design Responsive",
      description:
        "Interfaces adaptatives qui s'ajustent parfaitement à tous les appareils, du mobile au desktop.",
    },
    {
      title: "SEO & Accessibilité",
      description:
        "Sites optimisés pour le référencement naturel et accessibles à tous les utilisateurs, conformes aux standards du web.",
    },
  ];

  const etapes = [
    {
      numero: "01",
      titre: "Analyse & Conception",
      description:
        "Étude approfondie de vos besoins, définition des fonctionnalités et création des maquettes de l'interface utilisateur.",
    },
    {
      numero: "02",
      titre: "Développement",
      description:
        "Création du code source, implémentation des fonctionnalités et intégration des designs avec les meilleures pratiques de développement.",
    },
    {
      numero: "03",
      titre: "Tests & Optimisation",
      description:
        "Vérification approfondie des performances, de la sécurité et de l'expérience utilisateur sur tous les appareils.",
    },
    {
      numero: "04",
      titre: "Déploiement & Suivi",
      description:
        "Mise en ligne du site et accompagnement continu pour assurer son bon fonctionnement et son évolution.",
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
              Développement Web
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Des solutions web performantes et sur-mesure pour transformer vos
              idées en réalité digitale.
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
                Des solutions web qui font la différence
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Dans un monde de plus en plus digital, votre présence en ligne
                doit être à la hauteur de vos ambitions. Nous créons des
                solutions web qui non seulement répondent à vos besoins, mais
                dépassent vos attentes.
              </p>
              <p className="text-gray-300 text-lg">
                Notre équipe de développeurs expérimentés combine expertise
                technique et créativité pour construire des applications web
                modernes, performantes et évolutives.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Pourquoi choisir notre expertise en développement web ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Solutions personnalisées adaptées à vos besoins
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Technologies modernes et évolutives
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Performance et sécurité optimisées
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Support technique continu et maintenance
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
              Une méthodologie rigoureuse pour des résultats exceptionnels
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
              Un accompagnement technique étape par étape pour la réussite de
              votre projet
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
              Prêt à concrétiser votre projet web ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation gratuite et découvrez comment
              nous pouvons transformer votre vision en réalité digitale.
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
