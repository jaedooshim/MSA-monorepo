import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';

@Injectable()
export class CommentService {
  constructor(private commentRepository: CommentRepository) {}

  async create(data: ICommentCreate): Promise<string> {
    await this.commentRepository.create(data);
    return '댓글이 성공적으로 작성되었습니다.';
  }
}
