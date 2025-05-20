import AuthGuard from "@/components/admin/AuthGuard";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "editor" | "user">("user");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        router.refresh();
      } else {
        console.error("Erreur lors de la création de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-mikory-dark text-white">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-2xl font-bold mb-8">Gestion des utilisateurs</h1>

        <div className="bg-mikory-dark-light p-6 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">
            Créer un nouvel utilisateur
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Rôle</label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "admin" | "editor" | "user")
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
              >
                <option value="admin">Administrateur</option>
                <option value="editor">Éditeur</option>
                <option value="user">Utilisateur</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition"
            >
              Créer l'utilisateur
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}