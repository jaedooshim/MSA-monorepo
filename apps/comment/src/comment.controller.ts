import { Controller } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentUpdateDto } from './types/update/request.dto';
import { Comment, Prisma } from '@prisma/client';
import { CommentFindMany } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 회원 댓글작성
  @MessagePattern('create_comment')
  async create(body: Prisma.CommentUncheckedCreateInput): Promise<string> {
    return await this.commentService.create(body);
  }

  //판매자 댓글작성
  @MessagePattern('create_sales_comment')
  async salesCreate(body: Prisma.CommentUncheckedCreateInput): Promise<string> {
    return await this.commentService.salesCreate(body);
  }

  @MessagePattern('update_comment')
  async update(data: { id: number; body: CommentUpdateDto; memberId: string }): Promise<string> {
    return await this.commentService.update(data.id, data.body, data.memberId);
  }

  // 판매자 본인 댓글 수정
  @MessagePattern('update_sales_comment')
  async salesUpdate(data: { id: number; body: CommentUpdateDto; adminId: string }): Promise<string> {
    return await this.commentService.salesUpdate(data.id, data.body, data.adminId);
  }

  @MessagePattern('delete_comment')
  async delete(data: { id: number; memberId: string }): Promise<string> {
    return await this.commentService.softDelete(data.id, data.memberId);
  }

  @MessagePattern('delete_sales_comment')
  async salesDelete(data: { id: number; adminId: string }): Promise<string> {
    return await this.commentService.salesSoftDelete(data.id, data.adminId);
  }

  @MessagePattern('find_unique_comment')
  async findUnique(data: { id: number }): Promise<Comment> {
    return await this.commentService.findUnique(data.id);
  }

  @MessagePattern('find_many_comment')
  async findMany(query: CommentFindMany) {
    return await this.commentService.findMany(query);
  }
}
