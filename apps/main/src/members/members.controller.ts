import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('members')
export class MembersController {
  constructor(@Inject('MEMBER_SERVICE') private client: ClientProxy) {}

  // @Post()
  // async create(@Body() body)
}
