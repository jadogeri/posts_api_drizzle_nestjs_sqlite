import { OmitType, PartialType } from '@nestjs/swagger'; // 👈 Switched from @nestjs/mapped-types
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends OmitType(PartialType(CreatePostDto), ['authorId'] as const) {}
