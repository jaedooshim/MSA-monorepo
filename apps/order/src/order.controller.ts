import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateDto } from './types/create/request.dto';
import { NonMemberGuard } from '@app/guard/non-member.guard';
import { Member } from '@app/decorators/member.decorator';
import { OrderAdminUpdate, OrderParamDto, OrderUpdateDto } from './types/update/request.dto';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { Sales } from '@app/decorators/sales.decorator';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { OrderDeleteNonMemberDto } from './types/delete/request.dto';
import { OrderFindManyDto } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('create_order')
  async create(body: Prisma.OrderUncheckedCreateInput): Promise<string | { message: string; authCode?: string }> {
    return await this.orderService.create(body);
  }

  @MessagePattern('update_order')
  async update(@Body() body: OrderUpdateDto, @Param() param: OrderParamDto, @Member() member?): Promise<string> {
    const data = { ...body, memberId: member?.id };
    return await this.orderService.update(param.id, data);
  }

  @Patch(':id')
  @UseGuards(SalesRoleGuard)
  async adminUpdate(@Body() body: OrderAdminUpdate, @Param() param: OrderParamDto, @Sales() sales): Promise<string> {
    return await this.orderService.adminUpdate(param.id, body, sales.id);
  }

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: OrderParamDto, @Member() member): Promise<string> {
    return await this.orderService.softDelete(param.id, member.id);
  }

  @Delete('nonmember/:id')
  @UseGuards(NonMemberGuard)
  async deleteNonMember(@Body() body: OrderDeleteNonMemberDto, @Param() param: OrderParamDto): Promise<string> {
    return await this.orderService.softDeleteNonMember(param.id, body);
  }

  @Get(':id')
  @UseGuards(NonMemberGuard)
  async findUnique(@Param() param: OrderParamDto) {
    return await this.orderService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: OrderFindManyDto) {
    return await this.orderService.findMany(query);
  }
}
