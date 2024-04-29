import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentCreate } from './types/create/request.interface';
import { ICommentUpdate } from './types/update/request.interface';
import { Comment } from '@prisma/client';
import { ICommentFindMany } from './types/find-many/request.interface';

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

  async update(id: number, data: ICommentUpdate, memberId: string): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    // console.log(comment.memberId);
    // console.log(memberId);
    if (comment.memberId !== memberId) throw new UnauthorizedException('해당 댓글수정에 관한 권한이 없습니다.');
    await this.commentRepository.update(id, data);
    return '댓글수정이 완료되었습니다.';
  }

  // 판매자 본인 댓글수정
  async salesUpdate(id: number, data: ICommentUpdate, salesId: string): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.adminId !== salesId) throw new UnauthorizedException('해당 댓글수정에 관한 권한이 없습니다.');
    await this.commentRepository.salesUpdate(id, data);
    return '댓글수정이 완료되었습니다.';
  }

  async softDelete(id: number, memberId: string): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.memberId !== memberId) throw new UnauthorizedException('해당 댓글삭제에 관한 권한이 없습니다.');
    await this.commentRepository.softDelete(id);
    return '댓글삭제가 완료되었습니다.';
  }

  async salesSoftDelete(id: number, salesId: string): Promise<string> {
    const comment = await this.commentRepository.findUniqueOrThrow(id);
    if (comment.adminId !== salesId) throw new UnauthorizedException('해당 댓글삭제에 관한 권한이 없습니다.');
    await this.commentRepository.salesSoftDelete(id);
    return '댓글삭제가 완료되었습니다.';
  }

  async findUnique(id: number): Promise<Comment> {
    return await this.commentRepository.findUniqueOrThrow(id);
  }

  async findMany(data: ICommentFindMany) {
    return await this.commentRepository.findMany(data);
  }
}
