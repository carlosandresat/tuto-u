import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;