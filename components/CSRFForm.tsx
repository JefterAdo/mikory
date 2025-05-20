'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getCSRFToken } from '@/lib/csrf';

type CSRFFormProps = {
  action: string;
  method?: 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  children: React.ReactNode;
  className?: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
};

export function CSRFForm({
  action,
  method = 'POST',
  children,
  className,
  onSuccess,
  onError,
}: CSRFFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const handleSubmit = async (e: SubmitEvent) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const csrfToken = getCSRFToken();
      
      if (!csrfToken) {
        console.error('Jeton CSRF manquant');
        return;
      }

      try {
        const response = await fetch(action, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
          body: method === 'GET' ? null : JSON.stringify(Object.fromEntries(formData)),
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        onSuccess?.(data);
        
        // Rafraîchir la page si nécessaire
        if (response.redirected) {
          router.push(response.url);
        } else if (form.dataset.redirect) {
          router.push(form.dataset.redirect);
        }
      } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
        onError?.(error as Error);
      }
    };

    form.addEventListener('submit', handleSubmit);
    return () => {
      form.removeEventListener('submit', handleSubmit);
    };
  }, [action, method, onError, onSuccess, router]);

  return (
    <form ref={formRef} method={method} className={className}>
      <input type="hidden" name="_csrf" value={getCSRFToken() || ''} />
      {children}
    </form>
  );
}
