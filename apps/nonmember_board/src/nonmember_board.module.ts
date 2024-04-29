import { Module } from '@nestjs/common';
import { NonmemberBoardController } from './nonmember_board.controller';
import { NonmemberBoardService } from './nonmember_board.service';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { NonmemberBoardRepository } from './nonmember_board.repository';
import { OrderModule } from '../../order/src/order.module';

@Module({
  imports: [PrismaModule, OrderModule],
  controllers: [NonmemberBoardController],
  providers: [NonmemberBoardService, NonmemberBoardRepository],
})
export class NonmemberBoardModule {}
