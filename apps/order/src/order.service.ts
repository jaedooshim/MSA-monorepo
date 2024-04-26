import { Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { IOrderCreate } from './types/create/request.interface';
import { ProductService } from '../../product/src/product.service';

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
      return { message: '주문이 성공적으로 요청되었습니다.', authCode: authNumber.toString() };
      // 멤버 반환값
    } else {
      await this.orderRepository.create(data);
      return '주문이 성공적으로 요청되었습니다.';
    }
  }
}
