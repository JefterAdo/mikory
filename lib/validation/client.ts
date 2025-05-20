import { z, ZodSchema } from 'zod';

type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string> };

export async function validateClientSide<T>(
  data: unknown,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    const validatedData = await schema.parseAsync(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    
    // Pour les erreurs inattendues
    console.error('Erreur de validation inattendue:', error);
    return {
      success: false,
      errors: { form: 'Une erreur inattendue est survenue lors de la validation' },
    };
  }
}

export function createFormValidator<T>(schema: ZodSchema<T>) {
  return async (formData: FormData): Promise<ValidationResult<T>> => {
    const data = Object.fromEntries(formData.entries());
    return validateClientSide(data, schema);
  };
}

export function createFieldValidator<T>(schema: ZodSchema<T>) {
  return async (value: unknown, fieldName: string) => {
    try {
      await schema.parseAsync(value);
      return ''; // Aucune erreur
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message || `Le champ ${fieldName} est invalide`;
      }
      return `Erreur de validation pour le champ ${fieldName}`;
    }
  };
}
