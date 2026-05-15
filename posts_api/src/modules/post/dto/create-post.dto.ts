import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsInt } from "class-validator";

export class CreatePostDto {
  @ApiProperty({ example: 'NestJS with Drizzle', description: 'The title of the post' })
  @IsString()
  @IsNotEmpty()
  title!: string; // 👈 Add the ! symbol here

  @ApiProperty({ example: 'This is the post content.', description: 'The body content' })
  @IsString()
  @IsNotEmpty()
  content!: string; // 👈 Add the ! symbol here

  @ApiProperty({ example: 1, description: 'The database ID of the author' })
  @IsInt()
  authorId!: number; // 👈 Add the ! symbol here
}
