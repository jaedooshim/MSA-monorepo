import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { ProductModule } from '../../product/src/product.module';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [PrismaModule, ProductModule, JwtModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
