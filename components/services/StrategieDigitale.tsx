"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StrategieDigitale() {
  const avantages = [
    {
      title: "Analyse approfondie",
      description:
        "Étude complète de votre marché, de vos concurrents et de votre positionnement actuel pour définir une stratégie gagnante.",
    },
    {
      title: "Objectifs SMART",
      description:
        "Définition d'objectifs spécifiques, mesurables, atteignables, réalistes et temporellement définis.",
    },
    {
      title: "Plan d'action détaillé",
      description:
        "Élaboration d'un plan d'action clair avec des étapes précises et des indicateurs de performance.",
    },
    {
      title: "Suivi et optimisation",
      description:
        "Analyse continue des résultats et ajustements stratégiques pour maximiser votre ROI.",
    },
  ];

  const etapes = [
    {
      numero: "01",
      titre: "Audit & Diagnostic",
      description:
        "Analyse complète de votre présence digitale actuelle et identification des opportunités d'amélioration.",
    },
    {
      numero: "02",
      titre: "Définition des Objectifs",
      description:
        "Établissement d'objectifs clairs et mesurables alignés avec vos ambitions business.",
    },
    {
      numero: "03",
      titre: "Élaboration de la Stratégie",
      description:
        "Création d'une feuille de route détaillée avec des actions concrètes et un calendrier précis.",
    },
    {
      numero: "04",
      titre: "Mise en Œuvre & Suivi",
      description:
        "Accompagnement dans l'exécution et suivi régulier des performances pour garantir le succès.",
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
              Stratégie Digitale
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Transformez votre présence digitale en un véritable levier de
              croissance avec une stratégie sur-mesure.
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
                Une stratégie digitale adaptée à vos ambitions
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Dans un monde de plus en plus digitalisé, avoir une présence en
                ligne ne suffit plus. Il faut une stratégie cohérente et
                efficace pour se démarquer et atteindre ses objectifs.
              </p>
              <p className="text-gray-300 text-lg">
                Notre approche combine expertise technique, créativité et
                analyse data pour créer une stratégie digitale qui génère des
                résultats concrets pour votre entreprise.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Pourquoi investir dans une stratégie digitale ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Augmentation de la visibilité en ligne
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Amélioration de l'engagement client
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Optimisation du retour sur investissement
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Développement de la notoriété de marque
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
              Une méthodologie éprouvée pour garantir le succès de votre
              stratégie digitale
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
              Un accompagnement étape par étape pour la réussite de votre projet
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
              Prêt à transformer votre présence digitale ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation gratuite et découvrez comment
              nous pouvons vous aider à atteindre vos objectifs.
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
