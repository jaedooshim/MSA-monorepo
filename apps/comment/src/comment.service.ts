import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(data: ICommentCreate): Promise<string> {
    if (!data.memberId) {
      throw new UnauthorizedException('댓글이용 서비스는 회원전용입니다. \n비회원이신 분들은 비회원전용 게시판을 이용해주세요.');
    }
    await this.commentRepository.create(data);
    return '댓글이 성공적으로 작성되었습니다.';
  }
}
