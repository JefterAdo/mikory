import React from "react";

export default function ContactDevis() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Contact & Devis
        </h2>
        <form className="bg-mikory-dark p-8 rounded-lg border border-gray-800 space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Nom</label>
            <input
              type="text"
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
              placeholder="Votre nom"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
              placeholder="Votre email"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
              rows={4}
              placeholder="Votre message ou demande de devis"
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-mikory-red-dark transition-all duration-300 w-full"
          >
            Envoyer
          </button>
        </form>
        <div className="mt-8 text-center text-gray-400">
          <div>
            Email :{" "}
            <a
              href="mailto:contact@mikory.com"
              className="text-primary hover:underline"
            >
              contact@mikory.com
            </a>
          </div>
          <div>
            Téléphone :{" "}
            <a href="tel:+22500000000" className="text-primary hover:underline">
              +225 00 00 00 00
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
