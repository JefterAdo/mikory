import { useState, useCallback } from 'react';
import { getCSRFToken } from '@/lib/csrf';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
}

export function useSecureFetch<T = any>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  const secureFetch = useCallback(async (
    url: string, 
    options: FetchOptions = {}
  ): Promise<{ data: T | null; error: Error | null }> => {
    setLoading(true);
    setError(null);

    try {
      const csrfToken = getCSRFToken();
      if (!csrfToken) {
        throw new Error('Jeton CSRF manquant');
      }

      const headers = new Headers(options.headers);
      headers.set('Content-Type', 'application/json');
      headers.set('X-CSRF-Token', csrfToken);

      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'same-origin',
        body: options.body ? JSON.stringify(options.body) : null,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Erreur HTTP: ${response.status}`
        );
      }


      const responseData = await response.json().catch(() => ({}));
      setData(responseData);
      return { data: responseData, error: null };
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Une erreur est survenue');
      setError(error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  }, []);

  return { secureFetch, loading, error, data };
}
