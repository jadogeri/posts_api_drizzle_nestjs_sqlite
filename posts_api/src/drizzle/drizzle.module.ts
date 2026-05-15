import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as userSchema from './schema/user.schema';
import * as postSchema from './schema/post.schema';

const schema = {
  users: userSchema.users,
  posts: postSchema.posts,
};

export const DRIZZLE = 'DRIZZLE_DATABASE';

@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE,
      useFactory: () => {
        const sqlite = new Database('sqlite.db');
        return drizzle(sqlite, { schema });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
