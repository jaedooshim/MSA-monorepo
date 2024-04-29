import { Module } from '@nestjs/common';
import { NonmemberBoardController } from './nonmember_board.controller';
import { NonmemberBoardService } from './nonmember_board.service';
import { PrismaModule } from '../../../libs/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [NonmemberBoardController],
  providers: [NonmemberBoardService],
})
export class NonmemberBoardModule {}
