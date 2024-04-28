import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { ICommentCreate } from './types/create/request.interface';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentRepository {
  constructor(private prisma: PrismaService) {}

  private commentRepository = this.prisma.extendedClient.comment;

  async create(data: ICommentCreate): Promise<Comment> {
    return await this.commentRepository.create({ data });
  }
}
