import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { JwtModule } from '@app/jwt';
import { CategoryModule } from '../../category/src/category.module';

@Module({
  imports: [PrismaModule, JwtModule, CategoryModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
