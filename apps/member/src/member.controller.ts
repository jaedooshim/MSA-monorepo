import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './types/create/request.dto';
import { MemberParamDto, UpdateMemberDto, UpdatePasswordDto } from './types/update/request.dto';
import { MemberFindManyDto } from './types/find-many/request.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() body: CreateMemberDto): Promise<string> {
    return await this.memberService.create(body);
  }

  @Put('/:id')
  // Guard 추가 예정
  async update(@Body() body: UpdateMemberDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.update(param.id, body);
  }

  @Patch('/:id')
  // Guard 추가 예정
  async updatePassword(@Body() body: UpdatePasswordDto, @Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.updatePassword(param.id, body.oldPassword, body.newPassword);
  }

  @Delete('/:id')
  // Guard 추가 예정
  async delete(@Param() param: MemberParamDto): Promise<string> {
    return await this.memberService.softDelete(param.id);
  }

  @Get('/:id')
  async findUnique(@Param() param: MemberParamDto) {
    return await this.memberService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: MemberFindManyDto) {
    return await this.memberService.findMany(query);
  }
}
