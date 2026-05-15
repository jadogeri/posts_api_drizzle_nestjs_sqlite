import { ApiProperty } from "@nestjs/swagger";
import { PostEntity } from "src/modules/post/entities/post.entity";

export class UserEntity {
  @ApiProperty({ example: 1, description: 'The unique auto-incrementing numeric identifier' })
  id?: number;

  @ApiProperty({ example: 'Alice Smith', description: 'The display name of the user' })
  name?: string;

  @ApiProperty({ example: 'alice@example.com', description: 'The unique registered email address' })
  email?: string;

  @ApiProperty({ type: () => [PostEntity], required: false, description: 'Array of related posts' })
  posts?: PostEntity[];
}
