import { Body, Controller, Param, Query, Post, Put, Patch, Delete, Get } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './types/create/request.dto';
import { MemberParamDto, UpdateMemberDto, UpdatePasswordDto } from './types/update/request.dto';
import { MemberFindManyDto } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() body: CreateMemberDto): Promise<string> {
    return await this.memberService.create(body);
  }

  // @MessagePattern('update_own_member')
  // Guard 추가 예정
  @Put(':id')
  async updateOwn(@Body() body: UpdateMemberDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.id, body);
  }

  // @MessagePattern('update_own_password')
  // Guard 추가 예정
  @Patch(':id')
  async updateOwnPassword(@Body() body: UpdatePasswordDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.updatePassword(param.id, body.oldPassword, body.newPassword);
  }

  // @MessagePattern('delete_own_member')
  // Guard 추가 예정
  @Delete(':id')
  async deleteOwn(@Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.softDelete(param.id);
  }

  // @MessagePattern('find_unique_member')
  @Get(':id')
  async findUnique(@Param() param: MemberParamDto) {
    return await this.memberService.findUnique(param.id);
  }

  @MessagePattern('find_many_member')
  async findMany(@Query() query: MemberFindManyDto) {
    return await this.memberService.findMany(query);
  }
}
