import clsx from 'clsx';

type TwMergeFn = (...classLists: any[]) => string;
let actualTwMergeFunction: TwMergeFn;

// Tentative d'utiliser require pour tailwind-merge comme workaround
let twMergeModule: any;
try {
  // @ts-ignore - TypeScript peut se plaindre de l'utilisation de require ici
  twMergeModule = require('tailwind-merge');
} catch (e) {
  console.error("[ERREUR] Échec de require('tailwind-merge'):", e);
}

if (typeof twMergeModule === 'function') {
  // Cas 1: require a retourné directement la fonction.
  actualTwMergeFunction = twMergeModule;
} else if (twMergeModule && typeof twMergeModule.twMerge === 'function') {
  // Cas 2: Le module a une propriété 'twMerge' (souvent pour les modules avec exportations nommées)
  actualTwMergeFunction = twMergeModule.twMerge;
} else if (twMergeModule && typeof twMergeModule.default === 'function') {
  // Cas 3: Le module a une propriété 'default' qui est la fonction (souvent pour les modules ES importés via require).
  actualTwMergeFunction = twMergeModule.default;
  console.warn(
    "tailwind-merge importé via require était un objet. Utilisation de sa propriété '.default' comme fonction.",
    twMergeModule
  );
} else {
  console.error(
    "[ERREUR CRITIQUE] Impossible de résoudre la fonction 'twMerge' via require('tailwind-merge').",
    "Module importé:", twMergeModule,
    "Les classes Tailwind ne seront PAS fusionnées. Seul 'clsx' sera utilisé."
  );
  actualTwMergeFunction = (classNamesFromClsx: string): string => classNamesFromClsx;
}

/**
 * Combine des classes CSS de manière optimisée avec clsx et tailwind-merge
 * @param inputs Les classes CSS à combiner
 * @returns Les classes combinées et optimisées
 */
export function cn(...inputs: any[]): string {
  const classNames = clsx(...inputs);
  return actualTwMergeFunction(classNames);
}

/**
 * Génère un slug à partir d'une chaîne de caractères.
 * Exemple: "Mon Super Article!" deviendra "mon-super-article"
 * @param text La chaîne à convertir en slug.
 * @returns Le slug généré.
 */
export function generateSlug(text: string): string {
  if (!text) return "";

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Remplace les espaces par des tirets
    .replace(/[ÀÁÂÃÄÅàáâãäå]/g, "a")
    .replace(/[ÈÉÊËèéêë]/g, "e")
    .replace(/[ÌÍÎÏìíîï]/g, "i")
    .replace(/[ÒÓÔÕÖØòóôõöø]/g, "o")
    .replace(/[ÙÚÛÜùúûü]/g, "u")
    .replace(/[Ýýÿ]/g, "y")
    .replace(/[Ññ]/g, "n")
    .replace(/[Çç]/g, "c")
    .replace(/[^a-z0-9\-]+/g, "-") // Supprime les caractères non alphanumériques sauf les tirets
    .replace(/--+/g, "-") // Remplace les tirets multiples par un seul
    .replace(/^-+/, "") // Supprime les tirets en début de chaîne
    .replace(/-+$/, ""); // Supprime les tirets en fin de chaîne
}

/**
 * Crée un extrait de texte à partir d'une chaîne plus longue.
 * @param text Le texte complet.
 * @param maxLength La longueur maximale de l'extrait.
 * @returns L'extrait généré.
 */
export function generateExcerpt(text: string, maxLength: number = 150): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, text.lastIndexOf(" ", maxLength)) + "...";
}

/**
 * Valide une adresse email.
 * @param email L'email à valider.
 * @returns Vrai si l'email est valide.
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Vérifie les champs obligatoires dans un objet.
 * @param obj L'objet à vérifier.
 * @param fields Les champs obligatoires.
 * @returns La liste des champs manquants.
 */
export const validateRequiredFields = (
  obj: Record<string, any>,
  fields: string[]
): string[] => {
  return fields.filter((field) => !obj[field]);
};

/**
 * Nettoie une chaîne de caractères en supprimant les balises HTML.
 * @param input La chaîne à nettoyer.
 * @returns La chaîne nettoyée.
 */
export const sanitizeInput = (input: string): string => {
  return input.replace(/<[^>]*>?/gm, "");
};
