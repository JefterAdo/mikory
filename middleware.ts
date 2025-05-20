import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { errorHandlerMiddleware } from './middleware/error-handler';

// Configuration des chemins nécessitant une authentification
const protectedPaths = ['/admin', '/api/admin', '/dashboard'];
const publicPaths = ['/login', '/api/auth', '/', '/about', '/blog'];

/**
 * Middleware principal de l'application
 * Gère l'authentification, la sécurité et les en-têtes HTTP
 */
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response: NextResponse;

  try {
    // Vérifier l'authentification pour les routes protégées
    const session = request.cookies.get('session');
    const isLoggedIn = !!session;

    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    if (protectedPaths.some(path => pathname.startsWith(path)) && !isLoggedIn) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Rediriger vers le tableau de bord si l'utilisateur est déjà connecté
    if (pathname === '/login' && isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Vérifier les permissions admin
    if (pathname.startsWith('/admin')) {
      // Vérification simplifiée des permissions admin
      // Implémenter une vérification plus robuste après l'installation complète de NextAuth
    }

    // Continuer avec la requête
    response = NextResponse.next();
    
    // Ajouter des en-têtes de sécurité
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Appliquer les en-têtes de sécurité CSP directement
    response.headers.set('Content-Security-Policy', [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com",
      "connect-src 'self' https: wss:",
      "media-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self'",
      "base-uri 'self'"
    ].join('; '));
    
    return response;
    
  } catch (error) {
    // Gérer les erreurs via le middleware d'erreur
    return errorHandlerMiddleware(request, error as Error);
  }
}

// Configuration des chemins à exclure du middleware
export const config = {
  matcher: [
    /*
     * Correspond à toutes les routes sauf:
     * 1. Fichiers statiques (/_next/static, /_next/image, /favicon.ico, etc.)
     * 2. Ressources publiques (/public/...)
     * 3. API routes qui gèrent leur propre authentification
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

// Fonction utilitaire pour créer une réponse avec des en-têtes de sécurité
function createSecureResponse(
  body: BodyInit | null = null,
  init: ResponseInit = {}
): NextResponse {
  const response = body instanceof NextResponse ? body : NextResponse.json(body, init);
  
  // Ajouter les en-têtes de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');
  
  // Ajouter Content-Security-Policy en production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set('Content-Security-Policy', [
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
    ].join('; '));
  }
  
  return response;
}
