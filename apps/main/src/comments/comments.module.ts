import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@app/jwt';
import { CommentsController } from './comments.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'COMMENT_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: { host: configService.get('TCP_HOST'), port: 3008 },
        }),
        inject: [ConfigService],
      },
    ]),
    JwtModule,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
