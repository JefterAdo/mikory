/** @type {import('next').NextConfig} */

// Configuration des en-têtes de sécurité
const securityHeaders = [
  // Protection contre le MIME-sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Protection contre le détournement de clics (Clickjacking)
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Protection contre les attaques XSS (prise en charge par les navigateurs modernes)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Politique de sécurité du contenu (CSP)
  // Note: Adaptez cette politique en fonction des besoins de votre application
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "connect-src 'self' https:",
      "media-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; '),
  },
  // Référent Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  // Feature Policy (obsolète mais maintenu pour la compatibilité)
  {
    key: 'Feature-Policy',
    value: [
      "camera 'none'",
      "microphone 'none'",
      "geolocation 'none'"
    ].join('; '),
  }
];

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Configuration des images
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com',
      'localhost'
      // Ajoutez ici d'autres domaines d'images si nécessaire
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  
  // Configuration des redirections
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/admin/dashboard',
        permanent: true
      }
    ];
  },
  
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        // Appliquer à tous les chemins
        source: '/(.*)',
        headers: securityHeaders
      }
    ];
  },
  
  // Configuration de la compression
  compress: true,
  

  
  // Configuration pour la sécurité des en-têtes
  poweredByHeader: false,
  generateEtags: true,
  
  // Configuration pour les pages
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Configuration pour la sécurité des cookies
  // Assurez-vous d'avoir une valeur secrète définie dans vos variables d'environnement
  env: {
    COOKIE_SECRET: process.env.COOKIE_SECRET || 'votre-secret-tres-long-et-securise'
  },
  
  // Configuration pour la sécurité des en-têtes de requête
  // Empêche la divulgation de la version de Next.js
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2
  }
};

module.exports = nextConfig;
