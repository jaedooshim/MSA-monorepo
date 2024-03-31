import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { MSAExceptionFilter } from './msa.exception.global.filter';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  app.useGlobalFilters(new MSAExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
