import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { IOrderCreate } from './types/create/request.interface';
import { ProductService } from '../../product/src/product.service';
import { IOrderAdminUpdate, IOrderUpdate } from './types/update/request.interface';
import { IOrderDeleteNonMember } from './types/delete/request.interface';
import { Order, Prisma } from '@prisma/client';
import { IOrderFindMany } from './types/find-many/request.interface';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService,
  ) {}

  async create(data: Prisma.OrderUncheckedCreateInput): Promise<string | { message: string; authCode?: string }> {
    await this.productService.findUnique(data.productId);
    // 비회원 반환값
    if (!data.memberId) {
      const authNumber = await this.orderRepository.authCode();
      data.authKey = authNumber.toString();
      if (data.orderStatus === 'Complete') throw new UnauthorizedException('주문건은 신청과 예약만 가능합니다.');
      await this.orderRepository.create(data);
      return { message: '주문이 성공적으로 요청되었습니다. \n 다음 서비스를 위해 아래의 시리얼번호를 저장해주세요.', authCode: authNumber.toString() };
      // 멤버 반환값
    } else {
      if (data.orderStatus === 'Complete') {
        throw new UnauthorizedException('주문건은 신청과 예약만 가능합니다.');
      }
      await this.orderRepository.create(data);
      return '주문이 성공적으로 요청되었습니다.';
    }
  }

  async update(id: number, data: IOrderUpdate): Promise<string> {
    await this.orderRepository.findUniqueOrThrow(id);
    await this.productService.findUnique(data.productId);
    // 비회원 수정
    if (data.authKey) {
      const nonMember = await this.orderRepository.findUniqueAuthCode(data.authKey);
      if (data.authKey !== nonMember.authKey) {
        throw new ConflictException('시리얼번호가 일치하지 않습니다. \n 다시 한번 확인해주세요.');
      } else if (data.orderStatus === 'Complete') {
        throw new UnauthorizedException('해당하는 상태로 변경할 권한이 없습니다.');
      }
    }
    // 회원 수정
    if (data.orderStatus === 'Complete') throw new UnauthorizedException('해당하는 상태로 변경할 권한이 없습니다.');
    await this.orderRepository.update(id, data);
    return '주문건이 수정되었습니다.';
  }

  // 관리자 수정
  async adminUpdate(id: number, data: IOrderAdminUpdate, salesId: string): Promise<string> {
    await this.orderRepository.findUniqueOrThrow(id);
    const product = await this.productService.findUnique(data.productId);
    console.log('등록된 상품 판매자', product.adminId);
    console.log('요청한 토큰의 판매자', salesId);
    if (product.adminId !== salesId) throw new UnauthorizedException('해당하는 상품의 판매자가 아닙니다.');
    await this.orderRepository.adminUpdate(id, data);
    return '해당하는 주문상태를 업데이트 하였습니다.';
  }

  // 회원 주문삭제 요청의 경우
  async softDelete(id: number, memberId: string): Promise<string> {
    const order = await this.orderRepository.findUniqueOrThrow(id);
    if (order.memberId !== memberId) throw new UnauthorizedException('주문삭제건에 대한 권한이 없습니다.');
    await this.orderRepository.softDelete(id);
    return '해당하는 주문건을 삭제하였습니다.';
  }

  // 비회원 주문삭제 요청의 경우
  async softDeleteNonMember(id: number, data: IOrderDeleteNonMember): Promise<string> {
    const order = await this.orderRepository.findUniqueOrThrow(id);
    if (order.authKey !== data.authKey) throw new ConflictException('시리얼번호가 일치하지 않습니다.');
    await this.orderRepository.softDeleteNonMember(id);
    return '해당하는 주문건을 삭제하였습니다.';
  }

  async findUnique(id: number): Promise<Order> {
    return await this.orderRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IOrderFindMany) {
    return await this.orderRepository.findMany(data);
  }
}
