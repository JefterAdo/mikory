// Déclaration de type pour le module clsx
declare module 'clsx' {
  type ClassValue = string | number | boolean | undefined | null | { [key: string]: any } | ClassArray;
  interface ClassArray extends Array<ClassValue> {}
  
  function clsx(...inputs: ClassValue[]): string;
  
  export = clsx;
  export default clsx;
}

// Déclaration de type pour tailwind-merge
declare module 'tailwind-merge' {
  import { ClassValue } from 'clsx';
  
  function twMerge(...classes: ClassValue[]): string;
  
  export = twMerge;
  export default twMerge;
}

// Déclaration de type pour le module @/lib/utils
declare module '@/lib/utils' {
  export function cn(...inputs: (string | undefined | null | boolean)[]): string;
}

// Déclaration de type pour les modules CSS (si vous utilisez des modules CSS)
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
