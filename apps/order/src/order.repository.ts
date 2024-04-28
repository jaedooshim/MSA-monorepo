import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IOrderCreate } from './types/create/request.interface';
import { Order } from '@prisma/client';
import { IOrderAdminUpdate, IOrderUpdate } from './types/update/request.interface';
import { IOrderFindMany } from './types/find-many/request.interface';

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

  async adminUpdate(id: number, data: IOrderAdminUpdate): Promise<Order> {
    return await this.orderRepository.update({ where: { id }, data });
  }

  // 회원 주문삭제 요청의 경우
  async softDelete(id: number): Promise<Order> {
    return await this.orderRepository.softDelete({ id });
  }

  // 비회원 주문삭제 요청의 경우
  async softDeleteNonMember(id: number): Promise<Order> {
    return await this.orderRepository.softDelete({ id });
  }

  // 비회원전용 authCode
  async authCode() {
    return Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
  }

  async findUniqueAuthCode(authKey: string) {
    const authCode = await this.orderRepository.findUnique({ where: { authKey } });
    if (!authCode) throw new ConflictException('존재하지 않는 시리얼번호입니다.');
    return authCode;
  }

  async findUniqueOrThrow(id: number): Promise<Order> {
    const order = await this.orderRepository.findFirst({ where: { id } });
    if (!order) throw new NotFoundException('존재하지 않는 주문번호입니다.');
    return order;
  }

  async findMany(data: IOrderFindMany) {
    return this.prisma.order.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
