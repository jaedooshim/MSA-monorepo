import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IProductCreate } from './types/create/request.interface';
import { Product } from '@prisma/client';

@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  private productRepository = this.prisma.extendedClient.product;

  async create(data: IProductCreate): Promise<Product> {
    return await this.productRepository.create({ data });
  }
}
