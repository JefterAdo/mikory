import { cookies } from 'next/headers';

const CSRF_TOKEN_COOKIE = 'csrf-token';
const CSRF_HEADER = 'X-CSRF-Token';

// Générer un jeton CSRF compatible avec Edge Runtime
export function generateCSRFToken(): string {
  // Utiliser l'API Web Crypto disponible dans Edge Runtime
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function getCSRFToken(): string | undefined {
  return cookies().get(CSRF_TOKEN_COOKIE)?.value;
}

export function setCSRFToken(): string {
  const token = generateCSRFToken();
  cookies().set({
    name: CSRF_TOKEN_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });
  return token;
}

export function validateCSRFToken(token: string): boolean {
  const storedToken = getCSRFToken();
  return !!storedToken && storedToken === token;
}

export { CSRF_HEADER };
