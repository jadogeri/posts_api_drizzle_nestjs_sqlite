import { applyDecorators, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

/** Get All Users */
export function ApiGetUsers() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiOperation({ 
      summary: 'Get all users', 
      description: 'Retrieves a list of all registered users without nested relations.' 
    }),
    ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'Users list retrieved successfully.', 
      type: [UserEntity],
      examples: {
        success: {
          summary: 'User List Response Example',
          value: [
            { id: 1, name: 'Alice Smith', email: 'alice@example.com' },
            { id: 2, name: 'Bob Jones', email: 'bob@example.com' }
          ]
        }
      }
    })
  );
}

/** Get One User */
export function ApiGetUser() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'The unique numeric identifier key of the user', type: Number }),
    ApiOperation({ 
      summary: 'Get one user by ID', 
      description: 'Retrieves a single target user alongside all related blog posts via Drizzle schema relations.' 
    }),
    ApiResponse({ 
      status: HttpStatus.OK, 
      description: 'User entry matched and loaded successfully.', 
      type: UserEntity,
      examples: {
        success: {
          summary: 'User with Related Posts Response Example',
          value: {
            id: 1,
            name: 'Alice Smith',
            email: 'alice@example.com',
            posts: [
              { id: 101, title: 'My First Post', content: 'Hello World!', authorId: 1 }
            ]
          }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'The requested user row does not exist.' })
  );
}

/** Create User */
export function ApiCreateUser() {
  return applyDecorators(
    HttpCode(HttpStatus.CREATED),
    ApiOperation({ 
      summary: 'Create a new user', 
      description: 'Registers a brand new system user account. Requires a unique email string.' 
    }),
    ApiBody({ type: CreateUserDto }),
    ApiResponse({
      status: HttpStatus.CREATED,
      description: 'User profile instantiated successfully.',
      type: UserEntity,
      examples: {
        success: {
          summary: 'User Created Response Example',
          value: { id: 1, name: 'Alice Smith', email: 'alice@example.com' }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Supplied data payload format invalid or email conflict.' })
  );
}

/** Update User */
export function ApiUpdateUser() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'The primary unique key index number of the user to patch', type: Number }),
    ApiOperation({ 
      summary: 'Update user data fields', 
      description: 'Performs a partial structural patch update on an existing target user record properties.' 
    }),
    ApiBody({ type: UpdateUserDto }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User details patched cleanly.',
      type: UserEntity,
      examples: {
        success: {
          summary: 'User Updated Response Example',
          value: { id: 1, name: 'Alice Jones', email: 'alice@example.com' }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Target update row database pointer not located.' })
  );
}

/** Delete User */
export function ApiDeleteUser() {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    ApiParam({ name: 'id', description: 'Numeric account profile ID target to destroy', type: Number }),
    ApiOperation({ 
      summary: 'Delete user entry', 
      description: 'Completely unregisters a user row. Triggers SQLite cascading rules to drop all child post rows.' 
    }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'User deleted and relational constraints resolved safely.',
      examples: {
        success: {
          summary: 'User Dropped Success Response Example',
          value: { success: true, message: 'User records and dependent operations successfully disconnected.' }
        }
      }
    }),
    ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Target removal account row pointer not located.' })
  );
}
