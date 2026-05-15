import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { schema } from '../schemas/schema';
    
interface SeededUsers {
  user1: typeof schema.users.$inferSelect;
  user2: typeof schema.users.$inferSelect;
}

export async function seedPosts(
  db: BetterSQLite3Database<typeof schema>,
  users: SeededUsers
) {
  console.log('⏳ Seeding posts...');

  const { user1, user2 } = users;

  await db.insert(schema.posts).values([
    // --- Posts for John Doe (user1) ---
    {
      title: 'Getting Started with NestJS and Drizzle',
      content: 'This is a complete tutorial on SQLite workflows.',
      authorId: user1.id,
    },
    {
      title: 'Mastering Database Operations with SQLite',
      content: 'Learn how to use lightweight relational databases locally.',
      authorId: user1.id,
    },
    {
      title: 'Drizzle ORM vs Prisma',
      content: 'A detailed breakdown comparing performance and type safety.',
      authorId: user1.id,
    },

    // --- Posts for Jane Smith (user2) ---
    {
      title: 'Advanced TypeScript Configuration Options',
      content: 'Deep dive into resolving standard TS deprecation warnings.',
      authorId: user2.id,
    },
    {
      title: 'Building Scalable APIs with NestJS modules',
      content: 'Best architectural practices for organizing large backends.',
      authorId: user2.id,
    },
  ]);

  console.log('✅ Posts seeded successfully.');
}
