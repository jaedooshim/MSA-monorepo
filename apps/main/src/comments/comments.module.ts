import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@app/jwt';
import { CommentsController } from './comments.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMENT_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 3008 },
      },
    ]),
    JwtModule,
  ],
  controllers: [CommentsController],
})
export class CommentsModule {}
