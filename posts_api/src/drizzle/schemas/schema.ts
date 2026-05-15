import { users, usersRelations } from './user.schema';
import { posts, postsRelations } from './post.schema';

// 1. Individual top-level exports for drizzle-kit to build migration files
export { users, usersRelations, posts, postsRelations };

// 2. Collective object export for NestJS BetterSQLite3Database<typeof schema>
export const schema = {
  users,
  usersRelations,
  posts,
  postsRelations,
};
