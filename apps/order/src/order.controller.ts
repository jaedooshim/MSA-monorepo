import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDto } from './types/create/request.dto';
import { NonMemberGuard } from '@app/guard/non-member.guard';
import { Member } from '@app/decorators/member.decorator';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(NonMemberGuard)
  async create(@Body() body: OrderCreateDto, @Member() member?): Promise<string | { message: string; authCode?: string }> {
    const data = { ...body, memberId: member?.id };
    return await this.orderService.create(data);
  }
}
