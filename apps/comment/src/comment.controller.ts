import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { CommentCreateDto } from './types/create/request.dto';
import { ProductParamDto } from '../../product/src/types/update/request.dto';
import { Member } from '@app/decorators/member.decorator';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { Sales } from '@app/decorators/sales.decorator';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(MemberAuthGuard)
  async create(@Body() body: CommentCreateDto, @Member() member): Promise<string> {
    const data = { ...body, memberId: member.id };
    return await this.commentService.create(data);
  }

  @Post('sales')
  @UseGuards(SalesRoleGuard)
  async salesCreate(@Body() body: CommentCreateDto, @Sales() sales): Promise<string> {
    const data = { ...body, adminId: sales.id };
    return await this.commentService.salesCreate(data);
  }
}
