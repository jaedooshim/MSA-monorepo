import { Injectable } from '@nestjs/common';

@Injectable()
export class NonmemberBoardService {
  getHello(): string {
    return 'Hello World!';
  }
}
