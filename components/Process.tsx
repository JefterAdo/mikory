import React from "react";

const steps = [
  {
    title: "Analyse",
    description: "Compréhension de vos besoins et de votre marché.",
  },
  {
    title: "Stratégie",
    description: "Élaboration d'une stratégie digitale sur-mesure.",
  },
  {
    title: "Création",
    description: "Production de contenus et supports adaptés.",
  },
  { title: "Suivi", description: "Accompagnement et optimisation continue." },
];

export default function Process() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Notre méthode
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark p-8 rounded-lg border border-gray-800"
            >
              <div className="text-5xl mb-4 text-primary font-bold">
                {idx + 1}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
