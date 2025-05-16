"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AccompagnementConseil() {
  const avantages = [
    {
      title: "Expertise Personnalisée",
      description:
        "Un accompagnement sur-mesure adapté à vos besoins spécifiques et à votre secteur d'activité.",
    },
    {
      title: "Formation & Transfert",
      description:
        "Des formations pratiques pour renforcer les compétences de vos équipes et assurer l'autonomie.",
    },
    {
      title: "Suivi Continu",
      description:
        "Un suivi régulier et des ajustements stratégiques pour garantir la réussite de votre transformation digitale.",
    },
    {
      title: "Support Réactif",
      description:
        "Une assistance technique et stratégique disponible pour répondre à vos besoins en temps réel.",
    },
  ];

  const etapes = [
    {
      numero: "01",
      titre: "Diagnostic Initial",
      description:
        "Analyse approfondie de vos besoins, de vos objectifs et de votre maturité digitale pour établir un plan d'action personnalisé.",
    },
    {
      numero: "02",
      titre: "Plan d'Action",
      description:
        "Élaboration d'une feuille de route détaillée avec des objectifs clairs et des indicateurs de performance.",
    },
    {
      numero: "03",
      titre: "Mise en Œuvre",
      description:
        "Accompagnement dans la mise en place des solutions et formation de vos équipes aux nouvelles pratiques.",
    },
    {
      numero: "04",
      titre: "Suivi & Optimisation",
      description:
        "Évaluation régulière des résultats et ajustements stratégiques pour maximiser l'impact de votre transformation.",
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
              Accompagnement & Conseil
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Un partenaire de confiance pour vous guider dans votre
              transformation digitale et maximiser votre succès en ligne.
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
                Un accompagnement sur-mesure pour votre succès digital
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Dans un environnement digital en constante évolution, avoir un
                partenaire de confiance pour vous guider est essentiel. Notre
                expertise et notre approche personnalisée vous permettent de
                naviguer en toute confiance dans votre transformation digitale.
              </p>
              <p className="text-gray-300 text-lg">
                Notre équipe d'experts vous accompagne à chaque étape, de la
                définition de votre stratégie à la mise en œuvre des solutions,
                en passant par la formation de vos équipes.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Pourquoi choisir notre accompagnement ?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Expertise sectorielle approfondie
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Approche personnalisée et flexible
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Support continu et réactif
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Résultats concrets et mesurables
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
              Une méthodologie éprouvée pour votre réussite digitale
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
              Un accompagnement structuré pour des résultats optimaux
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
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation gratuite et découvrez comment
              notre accompagnement peut propulser votre entreprise vers le
              succès digital.
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
