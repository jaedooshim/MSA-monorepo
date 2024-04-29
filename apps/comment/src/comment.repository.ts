import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { ICommentCreate } from './types/create/request.interface';
import { Comment } from '@prisma/client';
import { ICommentUpdate } from './types/update/request.interface';
import { ICommentFindMany } from './types/find-many/request.interface';

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

  // 회원 본인 댓글수정
  async update(id: number, data: ICommentUpdate): Promise<Comment> {
    return await this.commentRepository.update({ where: { id }, data });
  }

  // 판매자 본인 댓글수정
  async salesUpdate(id: number, data: ICommentUpdate): Promise<Comment> {
    return await this.commentRepository.update({ where: { id }, data });
  }

  // 회원 본인 댓글삭제
  async softDelete(id: number): Promise<Comment> {
    return await this.commentRepository.softDelete({ id });
  }

  // 판매자 본인 댓글삭제
  async salesSoftDelete(id: number): Promise<Comment> {
    return await this.commentRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number): Promise<Comment> {
    const comment = await this.commentRepository.findFirst({ where: { id } });
    if (!comment) throw new NotFoundException('해당하는 댓글이 존재하지 않습니다.');
    return comment;
  }

  async findMany(data: ICommentFindMany) {
    return await this.prisma.comment.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
