import { Injectable, Inject } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { schema } from 'src/drizzle/schemas/schema';

@Injectable()
export class UserService {
  constructor(
    @Inject(DRIZZLE) private db: BetterSQLite3Database<typeof schema>
  ) {}

  async create(data: { name: string; email: string }) {
    return this.db.insert(schema.users).values(data).returning().get();
  }

  async findAll() {
    return this.db.query.users.findMany({ with: { posts: true } });
  }

  async findOne(id: number) {
    return this.db.query.users.findFirst({
      where: eq(schema.users.id, id),
      with: { posts: true },
    });
  }

  async update(id: number, data: { name?: string; email?: string }) {
    return this.db.update(schema.users).set(data).where(eq(schema.users.id, id)).returning().get();
  }

  async remove(id: number) {
    return this.db.delete(schema.users).where(eq(schema.users.id, id)).returning().get();
  }
}
