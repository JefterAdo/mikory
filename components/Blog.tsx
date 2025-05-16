import React from "react";

const articles = [
  {
    title: "Tendances du marketing digital en 2024",
    date: "12/03/2024",
    excerpt:
      "Découvrez les grandes tendances qui façonneront la communication digitale cette année.",
  },
  {
    title: "Comment réussir sa stratégie sur les réseaux sociaux ?",
    date: "28/02/2024",
    excerpt:
      "Nos conseils pour booster votre présence et votre engagement sur les réseaux.",
  },
  {
    title: "L'importance du contenu visuel pour votre marque",
    date: "15/02/2024",
    excerpt:
      "Pourquoi investir dans le design et la vidéo pour se démarquer en ligne ?",
  },
];

export default function Blog() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Blog & Actualités
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark p-8 rounded-lg border border-gray-800 flex flex-col justify-between"
            >
              <div>
                <div className="text-gray-400 text-sm mb-2">{article.date}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4">{article.excerpt}</p>
              </div>
              <a
                href="#"
                className="text-primary font-bold hover:underline mt-auto"
              >
                Lire la suite
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
