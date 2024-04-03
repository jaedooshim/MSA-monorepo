import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEMBER_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 5001 },
      },
    ]),
  ],
  controllers: [MembersController],
})
export class MembersModule {}
