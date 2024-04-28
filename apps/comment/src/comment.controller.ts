import { Body, Controller, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { CommentCreateDto } from './types/create/request.dto';
import { Member } from '@app/decorators/member.decorator';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { Sales } from '@app/decorators/sales.decorator';
import { CommentParamDto, CommentUpdateDto } from './types/update/request.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 회원 댓글작성
  @Post()
  @UseGuards(MemberAuthGuard)
  async create(@Body() body: CommentCreateDto, @Member() member): Promise<string> {
    const data = { ...body, memberId: member.id };
    return await this.commentService.create(data);
  }

  //판매자 댓글작성
  @Post('sales')
  @UseGuards(SalesRoleGuard)
  async salesCreate(@Body() body: CommentCreateDto, @Sales() sales): Promise<string> {
    const data = { ...body, adminId: sales.id };
    return await this.commentService.salesCreate(data);
  }

  @Patch(':id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto, @Member() member): Promise<string> {
    return await this.commentService.update(param.id, body, member.id);
  }
}
