import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from '../../../order/src/types/create/request.dto';
import { Member } from '@app/decorators/member.decorator';
import { NonMemberGuard } from '@app/guard/non-member.guard';
@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseGuards(NonMemberGuard)
  async create(@Body() body: OrderCreateDto, @Member() member?) {
    return this.client.send<string>('create_order', { ...body, memberId: member?.id });
  }
}
