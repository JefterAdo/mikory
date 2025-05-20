import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { env } from '@/lib/env';

// Schéma de validation pour les identifiants
const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
});

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(credentials) {
        try {
          // Valider les identifiants
          const { email, password } = await loginSchema.parseAsync(credentials);
          
          // Rechercher l'utilisateur dans la base de données
          const user = await prisma.users.findUnique({
            where: { email },
          });

          // Vérifier si l'utilisateur existe et a un mot de passe
          if (!user || !user.password) {
            console.warn(`Tentative de connexion échouée: utilisateur non trouvé pour ${email}`);
            return null;
          }

          // Vérifier le mot de passe
          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            console.warn(`Tentative de connexion échouée: mot de passe incorrect pour ${email}`);
            return null;
          }

          // Retourner les données utilisateur
          return {
            id: user.id,
            email: user.email,
            name: user.name || user.username,
            role: user.role,
          };
        } catch (error) {
          console.error('Erreur lors de l\'authentification:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Ajouter des données supplémentaires au token JWT
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      // Ajouter des données supplémentaires à la session
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 jours
  },
  secret: env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  // Sécurité renforcée
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
});
