import React from "react";

export default function Newsletter() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-primary mb-6">Newsletter</h2>
        <p className="text-gray-300 text-lg mb-8">
          Recevez nos conseils, actualités et inspirations pour booster votre
          communication digitale.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            className="p-4 rounded bg-gray-900 text-white border border-gray-700 flex-1 min-w-0"
            placeholder="Votre email"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-4 rounded-md font-semibold hover:bg-mikory-red-dark transition-all duration-300"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  );
}
