import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDto } from './types/create/request.dto';
import { NonMemberGuard } from '@app/guard/non-member.guard';
import { Member } from '@app/decorators/member.decorator';
import { OrderParamDto, OrderUpdateDto } from './types/update/request.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(NonMemberGuard)
  async create(@Body() body: OrderCreateDto, @Member() member?): Promise<string | { message: string; authCode?: string }> {
    const data = { ...body, memberId: member?.id };
    return await this.orderService.create(data);
  }

  @Put(':id')
  @UseGuards(NonMemberGuard)
  async update(@Body() body: OrderUpdateDto, @Param() param: OrderParamDto, @Member() member?): Promise<string> {
    const data = { ...body, memberId: member?.id };
    return await this.orderService.update(param.id, data);
  }
}
