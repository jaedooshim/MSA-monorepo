import { NestFactory } from '@nestjs/core';
import { MemberModule } from './member.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaConfig } from 'libs/prisma/prisma.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MemberModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: 3002,
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
  PrismaConfig.LoggerInstance({
    warn: true,
    error: true,
    query: true,
    info: true,
  });
  await app.listen();
}
bootstrap();
