import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreatePostDto } from "../dto/create-post.dto";
import { UpdatePostDto } from "../dto/update-post.dto";
import { PostEntity } from "../entities/post.entity";

/** Get All Posts */
export function ApiGetPosts() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ 
      summary: 'Get all posts', 
      description: 'Retrieves a list of all community posts without parent relation schemas.' 
    }),
    ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Global feed index retrieved successfully.', 
      type: [PostEntity],
      examples: {
        success: {
          summary: 'Global Feed Response Example',
          value: [
            { id: 101, title: 'My First Post', content: 'Hello World!', authorId: 1 },
            { id: 102, title: 'Drizzle ORM Guide', content: 'Drizzle is lightweight.', authorId: 2 }
          ]
        }
      }
    })
  );
}

/** Get One Post */
export function ApiGetPost() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'The unique numeric identifier of the post', type: Number }),
    ApiOperation({ 
      summary: 'Get one post by ID', 
      description: 'Retrieves a single target post with nested parent author data records attached.' 
    }),
    ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Post structural record matched and returned successfully.', 
      type: PostEntity,
      examples: {
        success: {
          summary: 'Post with Nested Author Response Example',
          value: {
            id: 101,
            title: 'My First Post',
            content: 'Hello World!',
            authorId: 1,
            author: { id: 1, name: 'Alice Smith', email: 'alice@example.com' }
          }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Target post id entry pointer not located.' })
  );
}

/** Create Post */
export function ApiCreatePost() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ 
      summary: 'Create a new post', 
      description: 'Commits a completely new blog post row linked explicitly to a registered user id.' 
    }),
    ApiBody({ type: CreatePostDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'Post structural profile instantiated successfully.',
      type: PostEntity,
      examples: {
        success: {
          summary: 'Post Created Response Example',
          value: { id: 101, title: 'My First Post', content: 'Hello World!', authorId: 1 }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Payload structural constraints broken or missing foreign keys.' })
  );
}

/** Update Post */
export function ApiUpdatePost() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'The primary unique key index number of the post to patch', type: Number }),
    ApiOperation({ 
      summary: 'Update post content parameters', 
      description: 'Performs partial modification operations directly over text values of targeted posts.' 
    }),
    ApiBody({ type: UpdatePostDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Post structural attributes patched cleanly.',
      type: PostEntity,
      examples: {
        success: {
          summary: 'Post Updated Response Example',
          value: { id: 101, title: 'Updated Post Title', content: 'Hello World!', authorId: 1 }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Target configuration update row context not found.' })
  );
}

/** Delete Post */
export function ApiDeletePost() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'Numeric item sequence configuration to drop', type: Number }),
    ApiOperation({ 
      summary: 'Drop explicit post object', 
      description: 'Permanently removes a selected blog record completely out of database configurations.' 
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Target data elements successfully dropped.',
      examples: {
        success: {
          summary: 'Successful Drop Response Example',
          value: { success: true, message: 'Selected post block completely terminated.' }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Removal execution targets missed or empty.' })
  );
}
