import { PrismaClient } from '@prisma/client';

// Create a single instance of Prisma Client
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma; // Keep the Prisma Client instance in global scope for non-production environments
}

export default prisma;
