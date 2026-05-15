import { Module } from '@nestjs/common';
import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule, PostModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
