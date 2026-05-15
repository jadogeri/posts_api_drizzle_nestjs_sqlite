import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/modules/user/entities/user.entity";

export class PostEntity {
  @ApiProperty({ example: 101, description: 'The unique numeric identifier of the post' })
  id?: number;

  @ApiProperty({ example: 'My First Post', description: 'The title of the blog post' })
  title?: string;

  @ApiProperty({ example: 'Hello World!', description: 'The text content body of the post' })
  content?: string;

  @ApiProperty({ example: 1, description: 'The foreign key identifier matching the user' })
  authorId!: number;

  @ApiProperty({ type: () => UserEntity, required: false, description: 'The profile details of the author' })
  author?: UserEntity;
}
