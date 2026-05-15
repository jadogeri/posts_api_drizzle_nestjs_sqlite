import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  @IsString()
  @IsNotEmpty()
  name!: string; // 👈 Added the ! symbol here

  @ApiProperty({ example: 'john@example.com', description: 'Unique email address' })
  @IsEmail()
  email!: string; // 👈 Added the ! symbol here
}
