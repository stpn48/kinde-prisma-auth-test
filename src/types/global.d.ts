import { PrismaClient } from '@prisma/client';

// Extend the global namespace to include prisma
declare global {
  var prisma: PrismaClient | undefined;
}

// Ensure this file is treated as a module
export {};
