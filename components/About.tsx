"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  const values = [
    {
      title: "Écoute & Proximité",
      description:
        "Nous plaçons la compréhension de vos besoins et l'accompagnement au cœur de notre démarche.",
      icon: "👂",
    },
    {
      title: "Créativité & Expertise",
      description:
        "Notre équipe d'experts imagine des solutions innovantes et sur-mesure pour chaque projet.",
      icon: "💡",
    },
    {
      title: "Réactivité & Disponibilité",
      description:
        "Nous agissons rapidement, respectons les délais et restons à vos côtés à chaque étape.",
      icon: "⚡",
    },
  ];

  const stats = [
    { number: "50+", label: "Projets Réalisés" },
    { number: "30+", label: "Clients Satisfaits" },
    { number: "5+", label: "Années d'Expérience" },
    { number: "100%", label: "Engagement" },
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
              À propos de Mikory
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              MIKORY est une agence de communication digitale basée à Abidjan,
              spécialisée dans l'accompagnement des entreprises et institutions
              dans leur transformation numérique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-primary mb-4">
              Nos Valeurs
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Les principes qui guident notre action au quotidien
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="p-6 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-300">{stat.label}</p>
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
              Contactez-nous pour discuter de votre projet et découvrir comment
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
