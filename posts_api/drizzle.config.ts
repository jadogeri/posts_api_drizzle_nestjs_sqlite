import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schemas/schema.ts', 
  dialect: 'sqlite',
  dbCredentials: {
    url: 'sqlite.db',
  },
});
