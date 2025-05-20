import { useState, useCallback } from 'react';
import { z, ZodSchema } from 'zod';
import { validateClientSide } from '@/lib/validation/client';

type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormValidationOptions<T> {
  schema: ZodSchema<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<void> | void;
}

export function useFormValidation<T extends Record<string, any>>({
  schema,
  defaultValues,
  onSubmit,
}: UseFormValidationOptions<T>) {
  const [formData, setFormData] = useState<T>(defaultValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Valider un champ spécifique
  const validateField = useCallback(
    async (field: keyof T, value: any) => {
      const fieldSchema = schema.pick({ [field]: true });
      const result = await validateClientSide({ [field]: value }, fieldSchema);
      
      if (!result.success) {
        setErrors((prev) => ({ ...prev, [field]: result.errors[field as string] }));
        return false;
      }
      
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
      
      return true;
    },
    [schema]
  );

  // Gérer les changements de champs
  const handleChange = useCallback(
    (field: keyof T) =>
      async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, type, checked } = e.target as HTMLInputElement;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setFormData((prev) => ({
          ...prev,
          [field]: fieldValue,
        }));
        
        // Validation en temps réel (déboguage)
        if (errors[field]) {
          await validateField(field, fieldValue);
        }
      },
    [errors, validateField]
  );

  // Gérer la soumission du formulaire
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(null);
      setIsSubmitting(true);

      try {
        // Valider tous les champs
        const result = await validateClientSide(formData, schema);
        
        if (!result.success) {
          // Convertir les erreurs au format attendu
          const formattedErrors = Object.entries(result.errors).reduce<FormErrors<T>>(
            (acc, [key, value]) => ({
              ...acc,
              [key]: value,
            }),
            {}
          );
          
          setErrors(formattedErrors);
          return;
        }
        
        // Si la validation réussit, soumettre le formulaire
        await onSubmit(result.data);
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        setSubmitError(
          error instanceof Error ? error.message : 'Une erreur est survenue lors de la soumission du formulaire'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, onSubmit, schema]
  );

  // Réinitialiser le formulaire
  const resetForm = useCallback(() => {
    setFormData(defaultValues);
    setErrors({});
    setSubmitError(null);
  }, [defaultValues]);

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    resetForm,
    setFormData,
    validateField,
  };
}

// Hook utilitaire pour valider un champ unique
export function useFieldValidation<T>({
  name,
  schema,
  initialValue,
}: {
  name: string;
  schema: ZodSchema<T>;
  initialValue: T;
}) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(async () => {
    setIsValidating(true);
    try {
      await schema.parseAsync(value);
      setError(null);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || `Le champ ${name} est invalide`);
      } else {
        setError(`Erreur de validation pour le champ ${name}`);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [name, schema, value]);

  return {
    value,
    setValue,
    error,
    isValidating,
    validate,
    onChange: (newValue: T) => {
      setValue(newValue);
      if (error) {
        validate();
      }
    },
  };
}
