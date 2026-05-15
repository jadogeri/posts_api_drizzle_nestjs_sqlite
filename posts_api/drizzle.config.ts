import { defineConfig } from 'drizzle-kit';
import { DRIZZLE_CONFIG } from './src/constants/configuration.constant';

export default defineConfig({
  out: DRIZZLE_CONFIG.OUT_DIR, // 👈 Drizzle will create this folder structure automatically
  schema: DRIZZLE_CONFIG.SCHEMA_PATH, 
  dialect: 'sqlite',
  dbCredentials: {
    url: DRIZZLE_CONFIG.DB_PATH,
  },
});
