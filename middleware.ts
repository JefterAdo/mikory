import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { generateCSRFToken, validateCSRFToken, CSRF_HEADER } from './lib/csrf';

// Configuration des chemins nécessitant une authentification
const protectedPaths = ['/admin', '/api/admin'];
const publicPaths = ['/login', '/api/auth'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response: NextResponse;

  try {
    // Vérifier l'authentification pour les routes protégées
    if (protectedPaths.some(path => pathname.startsWith(path))) {
      const session = request.cookies.get('session');
      
      if (!session) {
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('callbackUrl', pathname);
        return NextResponse.redirect(loginUrl);
      }
    }

    // Continuer avec la requête
    response = NextResponse.next();
    
    // Vérifier CSRF pour les requêtes non-GET aux routes protégées
    if (request.method !== 'GET' && protectedPaths.some(path => pathname.startsWith(path))) {
      const csrfToken = request.headers.get(CSRF_HEADER) || request.nextUrl.searchParams.get('_csrf');
      
      if (!csrfToken || !validateCSRFToken(csrfToken)) {
        // Log simplifié compatible avec Edge Runtime
        console.warn(`[CSRF] Tentative de requête sans jeton CSRF valide: ${pathname}, méthode: ${request.method}`);
        return new NextResponse('Requête non autorisée', { status: 403 });
      }
    }

    // Définir le jeton CSRF si nécessaire
    if (!request.cookies.get('csrf-token')) {
      const token = generateCSRFToken();
      response.cookies.set({
        name: 'csrf-token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      });
    }
    
    // Ajouter des en-têtes de sécurité
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    
    // Ajouter un en-tête de politique de sécurité de contenu
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com data:",
      "connect-src 'self' https://api.mikory.com",
      "frame-ancestors 'none'",
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
    
    return response;
    
  } catch (error) {
    // Gérer les erreurs avec notre middleware d'erreur
    return errorHandlerMiddleware(request, error as Error);
  }
}

// Configuration des chemins à exclure du middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api/health (endpoint de santé)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/health|.*\.(?:svg|png|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};

// Fonction utilitaire pour créer une réponse avec des en-têtes de sécurité
export function createSecureResponse(
  body: BodyInit | null = null,
  init: ResponseInit = {}
) {
  const response = new NextResponse(body, init);
  
  // Ajout des en-têtes de sécurité
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}
