import { ConflictException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { IOrderCreate } from './types/create/request.interface';
import { ProductService } from '../../product/src/product.service';
import { IOrderUpdate } from './types/update/request.interface';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService,
  ) {}

  async create(data: IOrderCreate): Promise<string | { message: string; authCode?: string }> {
    await this.productService.findUnique(data.productId);
    // 비회원 반환값
    if (!data.memberId) {
      const authNumber = await this.orderRepository.authCode();
      data.authKey = authNumber.toString();

      await this.orderRepository.create(data);
      return { message: '주문이 성공적으로 요청되었습니다. \n 다음 서비스를 위해 아래의 시리얼번호를 저장해주세요.', authCode: authNumber.toString() };
      // 멤버 반환값
    } else {
      await this.orderRepository.create(data);
      return '주문이 성공적으로 요청되었습니다.';
    }
  }

  async update(id: number, data: IOrderUpdate): Promise<string> {
    await this.productService.findUnique(data.productId);
    await this.orderRepository.findUniqueOrThrow(id);
    const nonMember = await this.orderRepository.findUniqueAuthCode(data.authKey);
    if (data.authKey !== nonMember.authKey) throw new ConflictException('시리얼번호가 일치하지 않습니다. \n 다시 한번 확인해주세요.');
    await this.orderRepository.update(id, data);
    return '주문건이 수정되었습니다.';
  }
}
