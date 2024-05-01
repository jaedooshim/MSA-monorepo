import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CategoriesController } from './categories.controller';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3005 },
      },
    ]),
    JwtModule,
  ],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
