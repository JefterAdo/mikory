import { NextResponse } from 'next/server';
import type { NextRequest, NextResponse as NextResponseType } from 'next/server';

// Définition de l'erreur d'application
export class AppError extends Error {
  statusCode: number;
  code: string;
  details?: any;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_SERVER_ERROR', details?: any) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.name = this.constructor.name;
  }
}

export async function errorHandlerMiddleware(
  request: NextRequest,
  error: Error | any
): Promise<NextResponseType> {
  // Si l'erreur est déjà une NextResponse, on la retourne directement
  if (error instanceof NextResponse) {
    return error;
  }

  try {
    // Gestion des erreurs personnalisées
    if (error instanceof AppError) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
          code: error.code,
          ...(process.env.NODE_ENV === 'development' && {
            stack: error.stack,
            details: error.details,
          }),
        },
        { status: error.statusCode }
      );
    }

    // Gestion des erreurs génériques
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur inattendue est survenue',
        code: 'INTERNAL_SERVER_ERROR',
        ...(process.env.NODE_ENV === 'development' && {
          stack: error?.stack,
          error: error?.toString(),
        }),
      },
      { status: 500 }
    );
  } catch (error) {
    // En cas d'erreur dans le gestionnaire d'erreurs lui-même
    console.error(`[ERROR] Erreur critique dans le gestionnaire d'erreurs:`, error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur critique est survenue',
        code: 'CRITICAL_ERROR',
        ...(process.env.NODE_ENV === 'development' && {
          error: error instanceof Error ? error.message : 'Erreur inconnue',
        }),
      },
      { status: 500 }
    );
  }
}

export function withErrorHandler(
  handler: (req: NextRequest, ...args: any[]) => Promise<NextResponse>
) {
  return async function (request: NextRequest, ...args: any[]) {
    try {
      return await handler(request, ...args);
    } catch (error) {
      // Gérer les erreurs avec notre middleware d'erreur
      return errorHandlerMiddleware(request, error);
    }
  };
}
