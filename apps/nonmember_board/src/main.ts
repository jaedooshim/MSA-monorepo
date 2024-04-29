import { NestFactory } from '@nestjs/core';
import { NonmemberBoardModule } from './nonmember_board.module';

async function bootstrap() {
  const app = await NestFactory.create(NonmemberBoardModule);
  await app.listen(3009);
}
bootstrap();
