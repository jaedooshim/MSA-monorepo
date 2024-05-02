import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreateDto } from '../../../order/src/types/create/request.dto';
import { Member } from '@app/decorators/member.decorator';
import { NonMemberGuard } from '@app/guard/non-member.guard';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { OrderAdminUpdate, OrderParamDto, OrderUpdateDto } from '../../../order/src/types/update/request.dto';
import { Sales } from '@app/decorators/sales.decorator';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { OrderDeleteNonMemberDto } from '../../../order/src/types/delete/request.dto';
import { OrderFindManyDto } from '../../../order/src/types/find-many/request.dto';
@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDER_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseGuards(NonMemberGuard)
  async create(@Body() body: OrderCreateDto, @Member() member?) {
    return this.client.send<string>('create_order', { ...body, memberId: member?.id });
  }

  @Put(':id')
  @UseGuards(NonMemberGuard)
  async update(@Body() body: OrderUpdateDto, @Param() param: OrderParamDto, @Member() member?) {
    return this.client.send<string>('update_order', { id: param.id, body, memberId: member?.id });
  }

  @Patch(':id')
  @UseGuards(SalesRoleGuard)
  async adminUpdate(@Body() body: OrderAdminUpdate, @Param() param: OrderParamDto, @Sales() sales) {
    return this.client.send<string>('update_admin_order', { id: param.id, body, adminId: sales.id });
  }

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async memberDelete(@Param() param: OrderParamDto, @Member() member) {
    return this.client.send<string>('delete_member_order', { id: param.id, memberId: member.id });
  }

  @Delete('nonMember/:id')
  @UseGuards(NonMemberGuard)
  async nonMemberDelete(@Param() param: OrderParamDto, @Body() body: OrderDeleteNonMemberDto) {
    return this.client.send<string>('delete_nonMember_order', { id: param.id, body });
  }

  @Get(':id')
  @UseGuards(NonMemberGuard)
  async findUnique(@Param() param: OrderParamDto) {
    return this.client.send<string>('find_unique_order', param.id);
  }

  @Get()
  async findMany(@Query() query: OrderFindManyDto) {
    return this.client.send<string>('find_many_order', query);
  }
}
