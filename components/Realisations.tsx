"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const API_KEY = "AIzaSyDVPlKaf_6WCXEu3QbSyTHIOmoSEoUHkhk";
const CHANNEL_ID = "UCQpxGN8mbVJobwro6DlCIJA";
const MAX_RESULTS = 10;

const realisationsImages = [
  {
    type: "image",
    image: "/images/Nos réalisations/Colonie-de-vacance-Ghana-Adultes.jpg",
    title: "Colonie de Vacances au Ghana",
    description:
      "Organisation d'une colonie de vacances inoubliable pour adultes au Ghana, alliant découverte, détente et activités culturelles.",
  },
  {
    type: "image",
    image: "/images/Nos réalisations/Flyers_AFD.jpg",
    title: "Flyers pour l'AFD",
    description:
      "Création de supports visuels pour l'Agence Française de Développement, valorisant leurs actions et projets en Afrique.",
  },
  {
    type: "image",
    image: "/images/Nos réalisations/RICOM-Visuel-8-Mars.jpg",
    title: "RICOM - Journée de la Femme",
    description:
      "Visuel marquant pour la Journée internationale des droits des femmes, réalisé pour RICOM.",
  },
  {
    type: "image",
    image: "/images/Nos réalisations/Tedx-yakro-visuel-of.jpg",
    title: "TEDx Yakro",
    description:
      "Conception graphique pour l'événement TEDx Yakro, favorisant l'innovation et le partage d'idées.",
  },
  {
    type: "image",
    image: "/images/Nos réalisations/Visuel-1.png",
    title: "Visuel institutionnel",
    description:
      "Création d'un visuel institutionnel pour renforcer la communication d'entreprise.",
  },
];

export default function Realisations() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchVideos() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
        );
        const data = await res.json();

        if (data.error) {
          console.error("Erreur API YouTube:", data.error);
          setError(
            `Erreur API: ${data.error.message || JSON.stringify(data.error)}`
          );
          setLoading(false);
          return;
        }

        console.log("Données YouTube reçues:", data);

        const vids = (data.items || [])
          .filter((item: any) => item.id && item.id.kind === "youtube#video")
          .map((item: any) => ({
            type: "video",
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description || "",
            thumbnail:
              item.snippet.thumbnails.high?.url ||
              item.snippet.thumbnails.medium?.url ||
              item.snippet.thumbnails.default?.url,
          }));

        console.log("Vidéos traitées:", vids);
        setVideos(vids);
      } catch (err) {
        console.error("Erreur lors de la récupération des vidéos:", err);
        setError("Erreur lors de la récupération des vidéos");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, []);

  // Pour avoir un affichage équilibré avec une grille de 3 colonnes
  // Nous voulons un total de réalisations qui est un multiple de 3
  // Il y a 5 images, donc nous avons besoin de 7 vidéos pour avoir 12 éléments (4 rangées de 3)
  const totalImagesCount = realisationsImages.length; // 5 images
  const neededVideosForBalance = 7; // Pour avoir un total de 12 (multiple de 3)

  const videoSlice = videos.slice(0, neededVideosForBalance);
  const allRealisations = [...realisationsImages, ...videoSlice];

  return (
    <section className="py-20 bg-dark border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-primary mb-6 text-center">
          Nos Réalisations
        </h2>
        <p className="text-gray-300 text-lg mb-12 text-center max-w-3xl mx-auto">
          Découvrez quelques-unes de nos réalisations récentes, illustrant notre
          savoir-faire en communication visuelle, événementiel et accompagnement
          de projets innovants, ainsi que nos dernières vidéos.
        </p>

        {error && <div className="text-red-500 mb-6 text-center">{error}</div>}

        {loading && (
          <div className="text-center text-gray-300 mb-6">
            Chargement des vidéos YouTube...
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {allRealisations.map((item, idx) => (
            <div
              key={idx}
              className="bg-mikory-dark rounded-lg overflow-hidden shadow-lg border border-gray-800 hover:border-primary transition-colors duration-300"
            >
              {item.type === "image" ? (
                <>
                  <div className="relative w-full h-64">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      priority={idx === 0}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </>
              ) : (
                <>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="relative w-full h-64 bg-gray-800">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-gray-400">
                            Image non disponible
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
