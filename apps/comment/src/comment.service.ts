import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  // 회원 댓글생성
  async create(data: ICommentCreate): Promise<string> {
    await this.commentRepository.create(data);
    return '댓글이 성공적으로 작성되었습니다.';
  }

  // 판매자 댓글생성
  async salesCreate(data: ICommentCreate): Promise<string> {
    await this.commentRepository.salesCreate(data);
    return '댓글이 성공적으로 작성되었습니다.';
  }
}
