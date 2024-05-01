import { Controller } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category, Prisma } from '@prisma/client';
import { FindManyDto } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('create_category')
  async create(body: Prisma.CategoryUncheckedCreateInput): Promise<string> {
    return await this.categoryService.create(body);
  }

  @MessagePattern('update_category')
  async update(data: { id: number; body: Prisma.CategoryUncheckedUpdateInput }): Promise<string> {
    return await this.categoryService.update(data.id, data.body);
  }

  @MessagePattern('delete_category')
  async delete(data: { id: number }): Promise<string> {
    return await this.categoryService.softDelete(data.id);
  }

  @MessagePattern('find_unique_category')
  async findUnique(data: { id: number }): Promise<Category> {
    return await this.categoryService.findUnique(data.id);
  }

  @MessagePattern('find_many_category')
  async findMany(data: FindManyDto) {
    return this.categoryService.findMany(data);
  }
}
