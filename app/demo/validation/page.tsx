import { Metadata } from 'next';
import ValidatedFormExample from '@/components/examples/ValidatedFormExample';

export const metadata: Metadata = {
  title: 'Démonstration de validation de formulaire',
  description: 'Exemple de formulaire avec validation côté client et serveur',
};

export default function ValidationDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Démonstration de validation
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Exemple de formulaire avec validation côté client et serveur
          </p>
        </div>
        
        <div className="mt-10">
          <ValidatedFormExample />
        </div>
        
        <div className="mt-12 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              À propos de cette démonstration
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Ce formulaire utilise Zod pour la validation des données.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Validation côté client</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Utilisation de React Hook Form avec Zod pour une validation en temps réel
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Validation côté serveur</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Les mêmes schémas Zod sont utilisés côté serveur pour une validation cohérente
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Sécurité</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Protection contre les attaques XSS et validation stricte des entrées
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
