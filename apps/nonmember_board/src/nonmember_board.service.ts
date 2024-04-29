import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NonmemberBoardRepository } from './nonmember_board.repository';
import { INonMemberBoardCreate } from './types/create/request.interface';
import { OrderService } from '../../order/src/order.service';
import { INonMemberBoardUpdate } from './types/update/request.interface';
import { INonMemberBoardDelete } from './types/delete/request.interface';
import { NonMemberBoards } from '@prisma/client';
import { INonMemberBoardFindMany } from './types/find-many/request.interface';

@Injectable()
export class NonmemberBoardService {
  constructor(
    private nonMemberBoardRepository: NonmemberBoardRepository,
    private orderService: OrderService,
  ) {}

  async create(data: INonMemberBoardCreate, authKey: string): Promise<string> {
    const order = await this.orderService.findUnique(data.orderId);
    if (order.authKey !== authKey) throw new UnauthorizedException('게시글에 대한 권한이 없습니다.');
    await this.nonMemberBoardRepository.create(data);
    return '게시글이 요청되었습니다. \n관리자가 빠른 시일내로 답변해드리겠습니다.';
  }

  async update(id: number, data: INonMemberBoardUpdate, authKey: string): Promise<string> {
    await this.nonMemberBoardRepository.findUniqueOrThrow(id);
    const order = await this.orderService.findUnique(data.orderId);
    if (order.authKey !== authKey) throw new UnauthorizedException('게시글에 대한 권한이 없습니다.');
    await this.nonMemberBoardRepository.update(id, data);
    return '게시글 수정이 완료되었습니다. \n관리자가 빠른 시일내로 답변해드리겠습니다.';
  }

  async softDelete(id: number, data: INonMemberBoardDelete, authKey: string): Promise<string> {
    await this.nonMemberBoardRepository.findUniqueOrThrow(id);
    const order = await this.orderService.findUnique(data.orderId);
    if (order.authKey !== authKey) throw new UnauthorizedException('게시글에 대한 권한이 없습니다.');
    await this.nonMemberBoardRepository.softDelete(id);
    return '게시글 삭제가 완료되었습니다. \n문의사항이 생기면 다시 말씀해주세요.';
  }

  async findUnique(id: number): Promise<NonMemberBoards> {
    return await this.nonMemberBoardRepository.findUniqueOrThrow(id);
  }

  async findMany(data: INonMemberBoardFindMany) {
    return await this.nonMemberBoardRepository.findMany(data);
  }
}
