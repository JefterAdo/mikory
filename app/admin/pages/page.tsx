"use client";

import Link from "next/link";
import { HiPlus } from "react-icons/hi";

// TODO: Implémenter la récupération et l'affichage des pages existantes

export default function AdminPagesPage() {
  // Pour l'instant, on simule une liste vide de pages
  const pages = []; 

  return (
    <div className="container mx-auto px-4 py-8 bg-mikory-gray text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Pages</h1>
        <Link
          href="/admin/pages/new"
          className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-150"
        >
          <HiPlus className="mr-2" />
          Créer une nouvelle page
        </Link>
      </div>

      {pages.length === 0 ? (
        <div className="text-center py-10 bg-mikory-dark-gray rounded-lg shadow">
          <p className="text-xl text-gray-400">Aucune page pour le moment.</p>
          <p className="text-gray-500 mt-2">Cliquez sur "Créer une nouvelle page" pour commencer.</p>
        </div>
      ) : (
        // TODO: Logique pour afficher la liste des pages
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        //   {pages.map((page) => (
        //     <div key={page.id} className="bg-mikory-dark-gray p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
        //       <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
        //       <p className="text-gray-400 mb-4">Slug: /{page.slug}</p>
        //       <div className="flex space-x-2">
        //         <Link href={`/admin/pages/edit/${page.id}`} className="text-secondary hover:underline">Modifier</Link>
        //         <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:underline">Supprimer</button>
        //       </div>
        //     </div>
        //   ))}
        // </div>
        <p>Affichage de la liste des pages ici...</p>
      )}
    </div>
  );
}
