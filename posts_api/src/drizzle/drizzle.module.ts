import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { schema } from './schemas/schema';
import { DRIZZLE_CONFIG } from 'src/constants/configuration.constant';

export const DRIZZLE = 'DRIZZLE_DATABASE';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const sqlite = new Database(DRIZZLE_CONFIG.DB_PATH);
        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
