import { NextRequest, NextResponse } from 'next/server';
import { createLogger, format, transports } from 'winston';

// Créer et exporter le logger
export const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ]
});

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly code?: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non autorisé') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès refusé') {
    super(message, 403, 'FORBIDDEN');
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource non trouvée') {
    super(message, 404, 'NOT_FOUND');
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflit détecté') {
    super(message, 409, 'CONFLICT');
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Trop de requêtes') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED');
  }
}

interface ErrorResponse {
  success: boolean;
  message: string;
  code?: string;
  details?: any;
  stack?: string;
}

export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  // Log l'erreur complète en développement
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // Déterminer le statut et le message d'erreur appropriés
  let statusCode = 500;
  let code = 'INTERNAL_SERVER_ERROR';
  let message = 'Une erreur inattendue est survenue';
  let details: any = undefined;
  let stack: string | undefined = undefined;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    code = error.code || code;
    message = error.message;
    details = error.details;
  } else if (error instanceof Error) {
    message = error.message;
    code = error.name;
  } else if (typeof error === 'string') {
    message = error;
  }

  // En production, ne pas exposer la stack trace
  if (isDevelopment && error instanceof Error) {
    stack = error.stack;
  }

  // Journaliser l'erreur
  logger.error({
    message,
    statusCode,
    code,
    details: isDevelopment ? details : undefined,
    stack: isDevelopment ? stack : undefined
  });

  // Préparer la réponse d'erreur
  const errorResponse: ErrorResponse = {
    success: false,
    message,
    code,
  };

  // Ajouter les détails uniquement en développement
  if (isDevelopment) {
    if (details) errorResponse.details = details;
    if (stack) errorResponse.stack = stack;
  }

  return NextResponse.json(errorResponse, { status: statusCode });
}

// Wrapper pour gérer les erreurs dans les handlers API
export function withErrorHandler(handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>) {
  return async function (request: NextRequest, ...args: any[]): Promise<NextResponse> {
    try {
      return await handler(request, ...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

// Middleware pour valider le schéma avec Zod
export function validateRequest(schema: any) {
  return (request: Request) => {
    try {
      return schema.parse(request);
    } catch (error: any) {
      throw new ValidationError('Validation échouée', error.errors);
    }
  };
}
