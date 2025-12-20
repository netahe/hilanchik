import { defineConfig } from 'drizzle-kit';
import "dotenv/config";

export default defineConfig({
  out: './drizzle',
  schema: './lib/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
});