import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps {
  title: string;
  backLink?: string;  // Optionnel pour le lien de retour
}

export default function Header({ title, backLink }: HeaderProps) {
  return (
    <header className="bg-mikory-dark border-b border-gray-800 p-4 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
          {backLink && (
            <Link href={backLink} className="text-gray-400 hover:text-white">
              Retour
            </Link>
          )}
          <h1 className="text-2xl font-heading font-bold text-white">{title}</h1>
        </div>
        <p className="text-gray-400 text-sm mt-1">{title} détails</p>  // Peut être ajusté par page
      </div>
    </header>
  );
}
