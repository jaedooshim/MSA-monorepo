import { Body, Controller, Delete, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PostCreateDto } from './types/create/request.dto';
import { UpdatePostDto } from './types/update/request.dto';

@Controller('posts')
export class PostController {
  constructor(@Inject('POST_SERVICE') private client: ClientProxy) {}
  @Post()
  async create(@Body() body: PostCreateDto) {
    return this.client.send<string>('create_post', { ...body, userId: 1 });
  }

  @Put(':id')
  // Guard 추가
  async updateOwn(@Body() body: UpdatePostDto, @Param('id') id: number) {
    return this.client.send<string>('update_own_post', { id, body, userId: 1 });
  }

  @Delete(':id')
  // Guard 추가
  async deleteOwn(@Param('id') id: number) {
    return this.client.send<string>('delete_own_post', { id, userId: 1 });
  }

  @Get(':id')
  async findUnique(@Param('id') id: number) {
    return this.client.send<string>('find_unique_post', id);
  }

  @Get()
  async findMany() {
    return this.client.send<string>('find_many_post', {});
  }
}
