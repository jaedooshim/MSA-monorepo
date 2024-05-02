import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderAdminUpdate, OrderUpdateDto } from './types/update/request.dto';
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
  async update(data: { id: number; body: OrderUpdateDto }): Promise<string> {
    return await this.orderService.update(data.id, data.body);
  }

  @MessagePattern('update_admin_order')
  async adminUpdate(data: { id: number; body: OrderAdminUpdate; adminId: string }): Promise<string> {
    return await this.orderService.adminUpdate(data.id, data.body, data.adminId);
  }

  @MessagePattern('delete_member_order')
  async delete(data: { id: number; memberId: string }): Promise<string> {
    return await this.orderService.softDelete(data.id, data.memberId);
  }

  @MessagePattern('delete_nonMember_order')
  async deleteNonMember(data: { id: number; body: OrderDeleteNonMemberDto }): Promise<string> {
    return await this.orderService.softDeleteNonMember(data.id, data.body);
  }

  @MessagePattern('find_unique_order')
  async findUnique(id: number) {
    return await this.orderService.findUnique(id);
  }

  @MessagePattern('find_many_order')
  async findMany(data: OrderFindManyDto) {
    return await this.orderService.findMany(data);
  }
}
