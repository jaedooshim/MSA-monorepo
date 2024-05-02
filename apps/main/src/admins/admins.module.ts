import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AdminsController } from './admins.controller';
import { JwtModule } from '@app/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'ADMIN_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3004 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [AdminsController],
})
export class AdminsModule {}
