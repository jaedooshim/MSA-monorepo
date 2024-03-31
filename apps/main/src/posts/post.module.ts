import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'POST_SERVICE',
        transport: Transport.TCP,
        options: { host: '127.0.0.1', port: 5000 },
      },
    ]),
  ],
  controllers: [PostController],
})
export class PostModule {}
