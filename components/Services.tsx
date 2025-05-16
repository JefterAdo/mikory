"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    image: "/images/home/image-1.jpg",
    title: "Stratégie Digitale",
    description:
      "Conception et mise en œuvre de stratégies digitales innovantes pour nos clients.",
    link: "/services/strategie-digitale",
  },
  {
    image: "/images/Création visuelle.jpeg",
    title: "Création Visuelle",
    description:
      "Des visuels impactants pour renforcer l'identité de marque et attirer l'attention.",
    link: "/services/creation-visuelle",
  },
  {
    image: "/images/Code_web_dev.png",
    title: "Développement Web",
    description:
      "Sites web modernes, performants et adaptés à tous les supports.",
    link: "/services/developpement-web",
  },
  {
    image: "/images/home/image-6.jpg",
    title: "Campagnes Social Media",
    description: "Gestion et animation de communautés sur les réseaux sociaux.",
    link: "/services/campagnes-social-media",
  },
  {
    image: "/images/home/image-7.jpg",
    title: "Accompagnement & Conseil",
    description:
      "Un suivi personnalisé pour garantir la réussite de chaque projet.",
    link: "/services/accompagnement-conseil",
  },
  {
    image: "/images/home/image-4.jpg",
    title: "Formation Digitale",
    description:
      "Ateliers et formations pour renforcer les compétences de vos équipes.",
    link: "/services/formation-digitale",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Services() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Nos Services
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, idx) => (
            <Link href={service.link} key={idx}>
              <motion.div
                variants={itemVariants}
                className="bg-mikory-dark rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-primary transition-colors duration-300 cursor-pointer"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={idx === 0}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
