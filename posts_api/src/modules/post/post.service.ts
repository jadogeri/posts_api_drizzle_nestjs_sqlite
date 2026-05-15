import { Injectable, Inject } from '@nestjs/common';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import { eq } from 'drizzle-orm';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { schema } from 'src/drizzle/schemas/schema';

@Injectable()
export class PostService {
  constructor(
    @Inject(DRIZZLE) private db: BetterSQLite3Database<typeof schema>
  ) {}

  async create(data: { title: string; content: string; authorId: number }) {
    return this.db.insert(schema.posts).values(data).returning().get();
  }

  async findAll() {
    return this.db.query.posts.findMany({ with: { author: true } });
  }

  async findOne(id: number) {
    return this.db.query.posts.findFirst({
      where: eq(schema.posts.id, id),
      with: { author: true },
    });
  }

  async update(id: number, data: { title?: string; content?: string }) {
    return this.db.update(schema.posts).set(data).where(eq(schema.posts.id, id)).returning().get();
  }

  async remove(id: number) {
    return this.db.delete(schema.posts).where(eq(schema.posts.id, id)).returning().get();
  }
}
