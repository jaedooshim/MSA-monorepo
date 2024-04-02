import { NestFactory } from '@nestjs/core';
import { MemberModule } from './member.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaConfig } from 'libs/prisma/prisma.config';
async function bootstrap() {
  const app = await NestFactory.create(MemberModule);
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
  await app.listen(3002);
}
bootstrap();
