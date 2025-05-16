"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function FormationDigitale() {
  const avantages = [
    {
      title: "Formations Sur-Mesure",
      description:
        "Des programmes adaptés à vos besoins spécifiques et au niveau de compétence de vos équipes.",
    },
    {
      title: "Pratique & Concrète",
      description:
        "Des ateliers pratiques basés sur des cas concrets et des mises en situation réelles.",
    },
    {
      title: "Expertise Pédagogique",
      description:
        "Des formateurs expérimentés qui maîtrisent à la fois le digital et la pédagogie.",
    },
    {
      title: "Suivi Post-Formation",
      description:
        "Un accompagnement continu pour assurer la mise en pratique des acquis.",
    },
  ];

  const modules = [
    {
      numero: "01",
      titre: "Fondamentaux du Digital",
      description:
        "Acquisition des bases essentielles pour comprendre l'environnement digital et ses enjeux.",
    },
    {
      numero: "02",
      titre: "Outils & Plateformes",
      description:
        "Maîtrise des principaux outils digitaux et des plateformes clés pour votre activité.",
    },
    {
      numero: "03",
      titre: "Stratégie Digitale",
      description:
        "Apprentissage des méthodes pour élaborer et mettre en œuvre une stratégie digitale efficace.",
    },
    {
      numero: "04",
      titre: "Analyse & Performance",
      description:
        "Formation aux outils d'analyse et aux méthodes d'optimisation des performances digitales.",
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
              Formation Digitale
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Renforcez les compétences digitales de vos équipes avec nos
              formations sur-mesure et nos ateliers pratiques.
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
                Des formations adaptées à vos besoins
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                Dans un monde digital en constante évolution, la formation de
                vos équipes est un investissement essentiel. Nos programmes de
                formation sont conçus pour répondre à vos besoins spécifiques et
                vous permettre de rester compétitif.
              </p>
              <p className="text-gray-300 text-lg">
                Que vous soyez débutant ou expert, nos formations vous
                permettront d'acquérir les compétences nécessaires pour exceller
                dans votre domaine.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-800/50 p-8 rounded-lg"
            >
              <h3 className="text-2xl font-semibold text-primary mb-4">
                Nos domaines d'expertise
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Marketing digital et réseaux sociaux
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Outils de productivité et collaboration
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Analyse de données et reporting
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-gray-300">
                    Stratégie digitale et e-commerce
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
              Une méthodologie pédagogique efficace pour des résultats concrets
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

      {/* Modules Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nos Modules de Formation
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Des programmes complets pour développer vos compétences digitales
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {modules.map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {module.numero}
                </div>
                <div className="p-6 rounded-lg bg-gray-800/50">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    {module.titre}
                  </h3>
                  <p className="text-gray-300">{module.description}</p>
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
              Prêt à former vos équipes ?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins en formation et créer
              un programme sur-mesure pour votre équipe.
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
