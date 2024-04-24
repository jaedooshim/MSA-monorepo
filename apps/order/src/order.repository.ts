import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IOrderCreate } from './types/create/request.interface';
import { Order } from '@prisma/client';
import { IOrderUpdate } from './types/update/request.interface';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  private orderRepository = this.prisma.extendedClient.order;

  async create(data: IOrderCreate): Promise<Order> {
    return await this.orderRepository.create({ data });
  }

  async update(id: number, data: IOrderUpdate): Promise<Order> {
    return await this.orderRepository.update({ where: { id }, data });
  }
  async authCode() {
    return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  }
}
