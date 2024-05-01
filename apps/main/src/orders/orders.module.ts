import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3007 },
      },
    ]),
    JwtModule,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
