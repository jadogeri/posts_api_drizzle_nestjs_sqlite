import { PartialType } from '@nestjs/swagger'; // 👈 Switched from @nestjs/mapped-types
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
