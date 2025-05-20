"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Pour l'instant, nous simulons l'authentification
      // Plus tard, nous connecterons cela à notre API
      if (email === "admin@mikory.io" && password === "Admin123!") {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Stocker les informations d'authentification dans localStorage
        // Vérifier que nous sommes bien côté client avant d'utiliser localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem("mikory_admin_auth", JSON.stringify({
            user: { email, role: "admin" },
            token: "simulated_token_for_demo"
          }));
        }
        
        router.push("/admin/dashboard");
      } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mikory-dark to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <Image 
                  src="/images/logo.png" 
                  alt="Mikory Logo" 
                  width={120} 
                  height={40} 
                  className="h-10 w-auto" 
                />
              </div>
              <h2 className="text-2xl font-heading font-bold text-white">
                Administration Mikory
              </h2>
              <p className="text-gray-400 mt-2">
                Connectez-vous pour accéder au tableau de bord
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-white text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Adresse e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="admin@mikory.io"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                    Mot de passe
                  </label>
                  <Link 
                    href="/admin/auth/forgot-password"
                    className="text-sm text-primary hover:text-mikory-red-light transition"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 bg-primary hover:bg-mikory-red-light text-white font-medium rounded-lg transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Connexion en cours...
                    </span>
                  ) : (
                    "Se connecter"
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="py-4 px-8 bg-white/5 border-t border-gray-800">
            <p className="text-center text-sm text-gray-400">
              Retour au{" "}
              <Link href="/" className="text-primary hover:text-mikory-red-light transition">
                site principal
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mikory. Tous droits réservés.</p>
        </div>
      </div>
    </div>
  );
}
