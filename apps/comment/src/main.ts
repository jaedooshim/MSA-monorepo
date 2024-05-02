import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommentModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3008,
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters();
  await app.listen();
}
bootstrap();
