import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
})
export class CategoryModule {}
