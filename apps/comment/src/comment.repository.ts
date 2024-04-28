import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { ICommentCreate } from './types/create/request.interface';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  // 회원 댓글생성
  async create(data: ICommentCreate): Promise<Comment> {
    return await this.commentRepository.create({ data });
  }

  // 판매자 댓글생성
  async salesCreate(data: ICommentCreate): Promise<Comment> {
    return await this.commentRepository.create({ data });
  }
}
