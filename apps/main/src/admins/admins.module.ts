import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminsController } from './admins.controller';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ADMIN_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3004 },
      },
    ]),
    JwtModule,
  ],
  controllers: [AdminsController],
})
export class AdminsModule {}
