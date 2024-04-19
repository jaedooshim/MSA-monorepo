import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { ICategoryCreate } from './types/create/request.interface';
import { Category } from '@prisma/client';
import { ICategoryUpdate } from './types/update/request.interface';
import { IFindMany } from './types/find-many/request.interface';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  private categoryRepository = this.prisma.extendedClient.category;

  async create(data: ICategoryCreate): Promise<Category> {
    return await this.categoryRepository.create({ data });
  }

  async update(id: number, data: ICategoryUpdate): Promise<Category> {
    return await this.categoryRepository.update({ where: { id }, data });
  }

  async softDelete(id: number): Promise<Category> {
    return await this.categoryRepository.softDelete({ id });
  }

  async findMany(data: IFindMany) {
    return this.prisma.category.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async isValidName(name: string) {
    const existName = await this.categoryRepository.findFirst({ where: { name } });
    if (existName) throw new ConflictException('이미 등록된 카테고리입니다. \n 다시 한번 확인해주세요.');
  }

  async findUniqueOrThrow(id: number) {
    const category = await this.categoryRepository.findFirst({ where: { id } });
    if (!category) throw new NotFoundException('해당하는 카테고리가 없습니다.');
    return category;
  }
}
