import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';
import { IProductFindMany } from './types/find-many/request.interface';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  private productRepository = this.prisma.extendedClient.product;

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<Product> {
    return await this.productRepository.create({ data });
  }

  async update(id: number, data: Prisma.ProductUncheckedUpdateInput): Promise<Product> {
    return await this.productRepository.update({ where: { id }, data });
  }

  async softDelete(id: number): Promise<Product> {
    return await this.productRepository.softDelete({ id });
  }

  async findMany(data: IProductFindMany) {
    return this.prisma.product.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findUniqueOrThrow(id: number) {
    const product = await this.productRepository.findFirst({ where: { id } });
    if (!product) throw new NotFoundException('등록된 상품이 존재하지 않습니다.');
    // console.log(product);
    return product;
  }
}
