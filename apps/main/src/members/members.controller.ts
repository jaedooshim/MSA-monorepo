import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMemberDto } from '../../../member/src/types/create/request.dto';
import { MemberParamDto, UpdateMemberDto, UpdatePasswordDto } from '../../../member/src/types/update/request.dto';
import { MemberAuthGuard } from '@app/guard/member.auth.guard';
import { MemberFindManyDto } from '../../../member/src/types/find-many/request.dto';
import { Member } from '@app/decorators/member.decorator';

@Controller('members')
export class MembersController {
  constructor(@Inject('MEMBER_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() body: CreateMemberDto) {
    return this.client.send<string>('create_member', { ...body });
  }

  @Put(':id')
  @UseGuards(MemberAuthGuard)
  async update(@Body() body: UpdateMemberDto, @Param() param: MemberParamDto, @Member() member) {
    console.log('id', param.id);
    console.log('body', body);
    console.log('memberId', member);
    return this.client.send<string>('update_own_member', { id: param.id, body, memberId: member.id });
  }

  @Patch(':id/password')
  @UseGuards(MemberAuthGuard)
  async updatePassword(@Body() body: UpdatePasswordDto, @Param() param: MemberParamDto) {
    console.log('param.id', param.id);
    console.log('body', body);
    return this.client.send<string>('update_own_password', { id: param.id, oldPassword: body.oldPassword, newPassword: body.newPassword });
  }

  @Delete(':id')
  @UseGuards(MemberAuthGuard)
  async delete(@Param() param: MemberParamDto) {
    return this.client.send<string>('delete_own_member', { id: param.id });
  }

  @Get(':id')
  async findUnique(@Param() param: MemberParamDto) {
    return this.client.send<string>('find_unique_member', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: MemberFindManyDto) {
    return this.client.send<string>('find_many_member', query);
  }
}
