import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@app/jwt';
import { ProductsController } from './products.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3006 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [ProductsController],
})
export class ProductsModule {}
