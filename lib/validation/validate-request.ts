import { NextRequest, NextResponse } from 'next/server';
import { z, ZodSchema } from 'zod';
import { logger } from '../error-handler';

type ValidationSchemas = {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
};

export function validateRequest(schemas: ValidationSchemas) {
  return async (request: NextRequest) => {
    const errors: Record<string, string[]> = {};
    let validatedData: {
      body?: any;
      query?: any;
      params?: any;
    } = {};

    try {
      // Valider le corps de la requête
      if (schemas.body) {
        try {
          const body = await request.json();
          validatedData.body = await schemas.body.parseAsync(body);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.body = error.errors.map((e) => e.message);
          } else {
            logger.error('Erreur lors de la validation du corps:', error);
            throw new Error('Erreur lors de la validation du corps de la requête');
          }
        }
      }

      // Valider les paramètres de requête
      if (schemas.query) {
        try {
          const query = Object.fromEntries(request.nextUrl.searchParams);
          validatedData.query = await schemas.query.parseAsync(query);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.query = error.errors.map((e) => e.message);
          } else {
            logger.error('Erreur lors de la validation des paramètres de requête:', error);
            throw new Error('Erreur lors de la validation des paramètres de requête');
          }
        }
      }

      // Valider les paramètres d'URL
      if (schemas.params) {
        try {
          const params = request.nextUrl.pathname
            .split('/')
            .filter(Boolean)
            .reduce((acc: Record<string, string>, curr, i, arr) => {
              if (i % 2 === 0 && i < arr.length - 1) {
                acc[curr] = arr[i + 1];
              }
              return acc;
            }, {});

          validatedData.params = await schemas.params.parseAsync(params);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors.params = error.errors.map((e) => e.message);
          } else {
            logger.error('Erreur lors de la validation des paramètres d\'URL:', error);
            throw new Error('Erreur lors de la validation des paramètres d\'URL');
          }
        }
      }

      // Si des erreurs sont trouvées, renvoyer une réponse d'erreur
      if (Object.keys(errors).length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: 'Erreur de validation',
            errors,
          },
          { status: 400 }
        );
      }

      // Ajouter les données validées à la requête
      return { validatedData };
    } catch (error: unknown) {
      logger.error('Erreur lors de la validation de la requête:', error);
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      return NextResponse.json(
        {
          success: false,
          message: 'Erreur lors de la validation de la requête',
          ...(process.env.NODE_ENV === 'development' && { error: errorMessage }),
        },
        { status: 500 }
      );
    }
  };
}

// Fonction utilitaire pour valider les formulaires côté client
export async function validateFormData<T>(
  formData: FormData,
  schema: ZodSchema<T>
): Promise<{ success: boolean; data?: T; errors?: Record<string, string> }> {
  try {
    const data = Object.fromEntries(formData.entries());
    const result = await schema.safeParseAsync(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const path = error.path.join('.');
        errors[path] = error.message;
      });
      return { success: false, errors };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error('Erreur lors de la validation du formulaire:', error);
    return {
      success: false,
      errors: { form: 'Une erreur est survenue lors de la validation du formulaire' },
    };
  }
}
