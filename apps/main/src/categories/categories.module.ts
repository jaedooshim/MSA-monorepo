import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoriesController } from './categories.controller';
import { JwtModule } from '@app/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'CATEGORY_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3005 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
