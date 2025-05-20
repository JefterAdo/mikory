import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import { env } from './env';
import { NextResponse } from 'next/server';

// Initialisation du client Redis si l'URL est disponible
let redis: Redis | undefined;
if (env.REDIS_URL) {
  redis = new Redis({
    url: env.REDIS_URL,
  });
}

// Configuration du rate limiting avec des valeurs par défaut
export const rateLimiter = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: 'mikory-ratelimit',
    })
  : null;

/**
 * Applique le rate limiting à une requête
 * @param identifier - Identifiant unique pour le rate limiting (ex: IP, userId)
 * @param limit - Nombre de requêtes autorisées
 * @param duration - Durée en secondes
 * @returns Response en cas de limite dépassée, null sinon
 */
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  duration: number = 10
): Promise<NextResponse | null> {
  // Si le rate limiter n'est pas configuré, on continue
  if (!rateLimiter) {
    return null;
  }

  const { success, limit: rateLimitInfo } = await rateLimiter.limit(identifier);

  // Si la limite est dépassée, on renvoie une erreur 429
  if (!success) {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Trop de requêtes. Veuillez réessayer plus tard.',
        code: 'TOO_MANY_REQUESTS',
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'X-RateLimit-Limit': rateLimitInfo.limit.toString(),
          'X-RateLimit-Remaining': rateLimitInfo.remaining.toString(),
          'X-RateLimit-Reset': rateLimitInfo.reset.toString(),
        },
      }
    );
  }

  return null;
}

/**
 * Middleware de rate limiting pour les routes API
 * @param handler - Gestionnaire de route API
 * @param options - Options de configuration
 * @returns Gestionnaire de route avec rate limiting
 */
export function withRateLimit(
  handler: Function,
  options: { limit?: number; duration?: number } = {}
) {
  return async (req: Request) => {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const identifier = `${req.method}_${new URL(req.url).pathname}_${ip}`;
    
    const rateLimitResponse = await rateLimit(
      identifier,
      options.limit,
      options.duration
    );
    
    if (rateLimitResponse) {
      return rateLimitResponse;
    }
    
    return handler(req);
  };
}
