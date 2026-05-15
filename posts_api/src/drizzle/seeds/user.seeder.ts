import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { schema } from '../schemas/schema';

export async function seedUsers(db: BetterSQLite3Database<typeof schema>) {
  console.log('⏳ Purging old records and seeding users...');

  // Cascade rules or deletion order matters: clear posts before users
  await db.delete(schema.posts);
  await db.delete(schema.users);

  const user1 = await db.insert(schema.users).values({
    name: 'John Doe',
    email: 'john@example.com',
  }).returning().get();

  const user2 = await db.insert(schema.users).values({
    name: 'Jane Smith',
    email: 'jane@example.com',
  }).returning().get();

  console.log(' shadow ✅ Users seeded successfully.');
  return { user1, user2 };
}
