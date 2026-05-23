import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('POSTGRES_PRISMA_URL'),
    // @ts-ignore - Prisma 7 typings are missing directUrl but CLI supports it
    directUrl: env('POSTGRES_URL_NON_POOLING'),
  },
});
