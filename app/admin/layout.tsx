import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Administration - Mikory",
  description: "Tableau de bord d'administration Mikory",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-mikory-dark text-white pt-20">
      {/* Ajout de pt-20 pour compenser la hauteur de la navbar */}
      {children}
    </div>
  );
}
