import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

import type { NextAuthConfig } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

/**
 * Types étendus pour la session et le token JWT
 */
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

/**
 * Configuration de NextAuth
 * Importée depuis app/api/auth/[...nextauth]/route.ts
 */
export const config = {
  theme: {
    logo: '/logo.png',
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnAdmin) {
        return isLoggedIn && auth.user.role === 'ADMIN';
      }
      
      if (isOnDashboard) {
        return isLoggedIn;
      }
      
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
} satisfies NextAuthConfig;

export const { 
  handlers, 
  auth, 
  signIn, 
  signOut 
} = NextAuth(config);
