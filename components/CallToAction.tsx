"use client";

import React, { useState } from "react";

export default function CallToAction() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique d'envoi du formulaire
    console.log("Formulaire soumis:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-20 bg-primary/10 border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Prêt à booster votre présence digitale ?
          </h2>
          <p className="text-gray-300 text-lg">
            Contactez notre équipe ou demandez un audit gratuit pour découvrir
            comment Mikory peut transformer votre communication.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-mikory-dark p-8 rounded-lg border border-gray-800">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Demandez un devis
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="Votre email"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="Votre numéro"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Entreprise</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">
                  Type de projet
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  required
                >
                  <option value="">Sélectionnez un type de projet</option>
                  <option value="website">Site web</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="branding">Identité visuelle</option>
                  <option value="social">Réseaux sociaux</option>
                  <option value="seo">SEO</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
                  rows={4}
                  placeholder="Décrivez votre projet"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-mikory-red-dark transition-all duration-300"
              >
                Envoyer la demande
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-mikory-dark p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Audit gratuit
              </h3>
              <p className="text-gray-300 mb-6">
                Profitez d'un audit gratuit de votre présence digitale. Notre
                équipe analysera :
              </p>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Votre site web actuel
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Votre stratégie de contenu
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Votre présence sur les réseaux sociaux
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-primary mr-2 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Vos opportunités d'amélioration
                </li>
              </ul>
              <button className="mt-8 w-full border-2 border-primary text-primary px-8 py-4 rounded-md font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                Demander un audit gratuit
              </button>
            </div>

            <div className="bg-mikory-dark p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Contact direct
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  <strong>Email :</strong>{" "}
                  <a
                    href="mailto:contact@mikory.com"
                    className="text-primary hover:underline"
                  >
                    contact@mikory.com
                  </a>
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  <a
                    href="tel:+22500000000"
                    className="text-primary hover:underline"
                  >
                    +225 00 00 00 00
                  </a>
                </p>
                <p>
                  <strong>Adresse :</strong> Abidjan, Côte d'Ivoire
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
