import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MEMBER_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3002 },
      },
    ]),
    JwtModule,
  ],
  controllers: [MembersController],
})
export class MembersModule {}
