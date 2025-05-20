import { PrismaClient } from '@prisma/client';

// Déclaration pour éviter les multiples instances en développement
declare global {
  var prisma: PrismaClient | undefined;
}

// Création d'une instance PrismaClient avec journalisation en développement
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Assignation de l'instance à la variable globale en développement pour éviter les multiples instances
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
