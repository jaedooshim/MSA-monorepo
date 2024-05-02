import { Module } from '@nestjs/common';
import { MembersController } from './members.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@app/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'MEMBER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3002 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [MembersController],
})
export class MembersModule {}
