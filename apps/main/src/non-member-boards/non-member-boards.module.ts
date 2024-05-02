import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NonMemberBoardsController } from './non-member-boards.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NONMEMBER_BOARD_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3009 },
      },
    ]),
  ],
  controllers: [NonMemberBoardsController],
})
export class NonMemberBoardsModule {}
