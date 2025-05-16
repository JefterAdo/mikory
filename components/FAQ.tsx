import React from "react";

const faqs = [
  {
    question: "Quels types de projets réalisez-vous ?",
    answer:
      "Nous accompagnons nos clients sur des projets de communication digitale, création de sites web, gestion de réseaux sociaux, design graphique, vidéo et stratégie de contenu.",
  },
  {
    question: "Comment se déroule la collaboration ?",
    answer:
      "Nous commençons par une phase d'écoute et d'analyse, puis nous proposons une stratégie sur-mesure, suivie de la création et d'un accompagnement continu.",
  },
  {
    question: "Quels sont vos délais ?",
    answer:
      "Les délais varient selon la nature et la complexité du projet. Nous nous engageons à respecter les échéances définies ensemble.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          FAQ
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark p-6 rounded-lg border border-gray-800"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-400">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
