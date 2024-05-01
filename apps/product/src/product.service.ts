import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { CategoryService } from '../../category/src/category.service';
import { Prisma, Product } from '@prisma/client';
import { IProductFindMany } from './types/find-many/request.interface';

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoryService: CategoryService,
  ) {}

  async create(data: Prisma.ProductUncheckedCreateInput): Promise<string> {
    await this.categoryService.findUnique(data.categoryId);
    await this.productRepository.create(data);
    return '상품이 등록되었습니다.';
  }

  async update(id: number, data: Prisma.ProductUncheckedUpdateInput, adminId: string): Promise<string> {
    if (typeof data.categoryId !== 'number') throw new ConflictException('카테고리 아이디를 다시 한번 확인해주세요.');
    await this.categoryService.findUnique(data.categoryId);
    const product = await this.productRepository.findUniqueOrThrow(id);
    console.log('상품 판매자', product.adminId);
    console.log('요청한 판매자', adminId);
    if (product.adminId !== adminId) throw new UnauthorizedException('해당 상품을 수정할 권한이 없습니다.');
    await this.productRepository.update(id, data);
    return '상품이 수정되었습니다.';
  }

  async softDelete(id: number, salesId: string): Promise<string> {
    const product = await this.productRepository.findUniqueOrThrow(id);
    if (product.adminId !== salesId) throw new UnauthorizedException('해당 상품을 삭제할 권한이 없습니다.');
    await this.productRepository.softDelete(id);
    return '상품이 삭제되었습니다.';
  }

  async findUnique(id: number): Promise<Product> {
    return await this.productRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IProductFindMany) {
    return this.productRepository.findMany(data);
  }
}
