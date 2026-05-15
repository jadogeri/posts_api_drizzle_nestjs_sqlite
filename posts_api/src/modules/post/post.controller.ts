import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';  
import { ApiTags } from '@nestjs/swagger';
import { ApiCreatePost, ApiGetPosts, ApiGetPost, ApiUpdatePost, ApiDeletePost } from './decorators/post.decorator';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';


@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiCreatePost()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  @ApiGetPosts()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiGetPost()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  @ApiUpdatePost()
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  @ApiDeletePost()
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
