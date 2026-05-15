import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { seedUsers } from './user.seeder';
import { seedPosts } from './post.seeder';
import { schema } from '../schemas/schema';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });

async function main() {
  console.log('🚀 Starting database orchestration seeding pipeline...');

  // 1. Seed users first and capture returning references
  const seededUsers = await seedUsers(db);

  // 2. Pass references to post seeder to fulfill relation constraints
  await seedPosts(db, seededUsers);

  console.log('🏁 Database seeding complete!');
  sqlite.close();
}

main().catch((err) => {
  console.error('❌ Seeding process unexpected error: ', err);
  process.exit(1);
});
