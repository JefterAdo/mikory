import React from "react";

const stats = [
  { label: "Projets réalisés", value: 56 },
  { label: "Clients accompagnés", value: 27 },
  { label: "Année de création", value: 2022 },
  { label: "Satisfaction clients", value: "98%" },
];

export default function Stats() {
  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-10 text-center">
          Chiffres clés
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark p-8 rounded-lg border border-gray-800"
            >
              <div className="text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
