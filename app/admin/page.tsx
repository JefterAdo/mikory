"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/auth.service";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      router.push("/login");
    }
  }, [router]);

  if (!authService.isAuthenticated() || !authService.isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h1 className="text-2xl font-bold mb-4">
              Tableau de bord administrateur
            </h1>
            <p>Bienvenue dans l'interface d'administration.</p>
            <button
              onClick={() => {
                authService.logout();
                router.push("/login");
              }}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
