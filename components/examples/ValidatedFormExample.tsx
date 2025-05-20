'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useFormValidation } from '@/hooks/useFormValidation';
import { emailSchema, passwordSchema } from '@/lib/validation/schemas';

// Définition du schéma de validation avec Zod
const loginFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export default function ValidatedFormExample() {
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
  } = useFormValidation<LoginFormData>({
    schema: loginFormSchema,
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: async (data) => {
      // Simuler une requête API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Données du formulaire soumises:', data);
      setLoginSuccess(true);
    },
  });

  if (loginSuccess) {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded-md">
        <h2 className="text-xl font-bold mb-2">Connexion réussie !</h2>
        <p>Bienvenue, {formData.email} !</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Connexion</h2>
      
      {submitError && (
        <div className="p-3 bg-red-100 text-red-700 rounded-md">
          {submitError}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange('password')}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
          disabled={isSubmitting}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>
      
      <div className="flex items-center">
        <input
          id="rememberMe"
          type="checkbox"
          checked={formData.rememberMe || false}
          onChange={handleChange('rememberMe')}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          disabled={isSubmitting}
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
          Se souvenir de moi
        </label>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
          }`}
        >
          {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
        </button>
      </div>
    </form>
  );
}
