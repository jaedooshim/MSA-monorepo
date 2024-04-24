import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { OrderRepository } from './order.repository';
import { ProductModule } from '../../product/src/product.module';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [PrismaModule, ProductModule, JwtModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
