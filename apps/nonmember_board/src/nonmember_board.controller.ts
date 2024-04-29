import { Controller, Get } from '@nestjs/common';
import { NonmemberBoardService } from './nonmember_board.service';

@Controller()
export class NonmemberBoardController {
  constructor(private readonly nonmemberBoardService: NonmemberBoardService) {}

  @Get()
  getHello(): string {
    return this.nonmemberBoardService.getHello();
  }
}
