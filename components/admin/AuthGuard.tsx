"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Utiliser un état pour indiquer si nous sommes côté client
  const [isMounted, setIsMounted] = useState(false);

  // Marquer le composant comme monté côté client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Vérifier l'authentification uniquement côté client
  useEffect(() => {
    // Ne rien faire si nous ne sommes pas encore montés côté client
    if (!isMounted) return;

    // Vérifier si l'utilisateur est authentifié
    const authData = localStorage.getItem("mikory_admin_auth");
    
    if (!authData) {
      router.push("/admin/auth/login");
      return;
    }

    try {
      const auth = JSON.parse(authData);
      if (auth && auth.user && auth.token) {
        setIsAuthenticated(true);
      } else {
        router.push("/admin/auth/login");
      }
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      router.push("/admin/auth/login");
    } finally {
      setIsLoading(false);
    }
  }, [router, isMounted]);

  // Ne rien rendre pendant le rendu côté serveur ou pendant le chargement initial
  if (!isMounted || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mikory-dark">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
          <p className="text-gray-400">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
