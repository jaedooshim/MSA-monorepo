import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma, Product } from '@prisma/client';
import { ProductFindMany } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern('create_product')
  async create(body: Prisma.ProductUncheckedCreateInput): Promise<string> {
    return await this.productService.create(body);
  }

  @MessagePattern('update_product')
  async update(data: { id: number; body: Prisma.ProductUncheckedUpdateInput; adminId: string }): Promise<string> {
    return await this.productService.update(data.id, data.body, data.adminId);
  }

  @MessagePattern('delete_product')
  async delete(data: { id: number; adminId: string }): Promise<string> {
    return await this.productService.softDelete(data.id, data.adminId);
  }

  @MessagePattern('find_unique_product')
  async getProduct(data: { id: number }): Promise<Product> {
    return await this.productService.findUnique(data.id);
  }

  @MessagePattern('find_many_product')
  async findMany(data: ProductFindMany) {
    return this.productService.findMany(data);
  }
}
