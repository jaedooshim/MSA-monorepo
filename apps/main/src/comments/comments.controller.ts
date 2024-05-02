import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { CommentCreateDto } from '../../../comment/src/types/create/request.dto';
import { Member } from '@app/decorators/member.decorator';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { Sales } from '@app/decorators/sales.decorator';
import { CommentParamDto, CommentUpdateDto } from '../../../comment/src/types/update/request.dto';
import { CommentFindMany } from '../../../comment/src/types/find-many/request.dto';

@Controller('comments')
export class CommentsController {
  constructor(@Inject('COMMENT_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseGuards(MemberAuthGuard)
  async create(@Body() body: CommentCreateDto, @Member() member) {
    return this.client.send<string>('create_comment', { ...body, memberId: member.id });
  }

  @Post('sales')
  @UseGuards(SalesRoleGuard)
  async salesCreate(@Body() body: CommentCreateDto, @Sales() sales) {
    return this.client.send<string>('create_sales_comment', { ...body, adminId: sales.id });
  }

  @Patch(':id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto, @Member() member) {
    return this.client.send<string>('update_comment', { id: param.id, body, memberId: member.id });
  }

  @Patch('sales/:id')
  @UseGuards(SalesRoleGuard)
  async salesUpdate(@Body() body: CommentUpdateDto, @Param() param: CommentParamDto, @Sales() sales) {
    return this.client.send<string>('update_sales_comment', { id: param.id, body, adminId: sales.id });
  }

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: CommentParamDto, @Member() member) {
    return this.client.send<string>('delete_comment', { id: param.id, memberId: member.id });
  }

  @Delete('sales/:id')
  @UseGuards(SalesRoleGuard)
  async salesDelete(@Param() param: CommentParamDto, @Sales() sales) {
    return this.client.send<string>('delete_sales_comment', { id: param.id, adminId: sales.id });
  }

  @Get(':id')
  async findUnique(@Param() param: CommentParamDto) {
    return this.client.send<string>('find_unique_comment', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: CommentFindMany) {
    return this.client.send<string>('find_many_comment', query);
  }
}
