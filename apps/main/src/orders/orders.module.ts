import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersController } from './orders.controller';
import { JwtModule } from '@app/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3007 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
