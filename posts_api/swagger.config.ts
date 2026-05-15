
import { DocumentBuilder } from '@nestjs/swagger'


export const swaggerConfig = new DocumentBuilder()
    .setTitle('Posts & Users API')
    .setDescription('The Drizzle ORM + SQLite NestJS API documentation')
    .setVersion('1.0')
    .addTag('users')
    .addTag('posts')
    .build();