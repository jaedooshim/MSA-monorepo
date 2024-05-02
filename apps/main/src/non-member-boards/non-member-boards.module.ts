import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NonMemberBoardsController } from './non-member-boards.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'NONMEMBER_BOARD_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3009 },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [NonMemberBoardsController],
})
export class NonMemberBoardsModule {}
