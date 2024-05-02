import { NestFactory } from '@nestjs/core';
import { CommentModule } from './comment.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(CommentModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST,
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
