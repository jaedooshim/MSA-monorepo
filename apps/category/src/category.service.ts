import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category, Prisma } from '@prisma/client';
import { IFindMany } from './types/find-many/request.interface';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async create(data: Prisma.CategoryUncheckedCreateInput): Promise<string> {
    await this.categoryRepository.isValidName(data.name);
    await this.categoryRepository.create(data);
    return '카테고리가 생성되었습니다.';
  }

  async update(id: number, data: Prisma.CategoryUncheckedUpdateInput): Promise<string> {
    const category = await this.categoryRepository.findUniqueOrThrow(id);
    if (typeof data.name === 'string' && category.name !== data.name) {
      await this.categoryRepository.isValidName(data.name);
    }
    await this.categoryRepository.update(id, data);
    return '카테고리를 성공적으로 수정하였습니다.';
  }

  async softDelete(id: number): Promise<string> {
    await this.categoryRepository.findUniqueOrThrow(id);
    await this.categoryRepository.softDelete(id);
    return '카테고리를 삭제하였습니다.';
  }

  async findUnique(id: number): Promise<Category> {
    return await this.categoryRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IFindMany) {
    return this.categoryRepository.findMany(data);
  }
}
