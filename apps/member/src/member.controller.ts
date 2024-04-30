import { Controller } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberFindManyDto } from './types/find-many/request.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern('create_member')
  async create(body: Prisma.MemberUncheckedCreateInput): Promise<string> {
    return await this.memberService.create(body);
  }

  @MessagePattern('update_own_member')
  // @UseGuards(MemberAuthGuard)
  async updateOwn(data: { id: string; body: Prisma.MemberUncheckedUpdateInput }): Promise<string> {
    return await this.memberService.updateOwn(data.id, data.body);
  }

  @MessagePattern('update_own_password')
  // @UseGuards(MemberAuthGuard)
  async updateOwnPassword(@Payload() payload: { id: string; oldPassword: string; newPassword: string }): Promise<string> {
    const { id, oldPassword, newPassword } = payload;
    console.log('payload', payload);
    return await this.memberService.updatePassword(id, oldPassword, newPassword);
  }

  @MessagePattern('delete_own_member')
  // @UseGuards(MemberAuthGuard)
  async deleteOwn(data: { id: string }): Promise<string> {
    return await this.memberService.softDelete(data.id);
  }

  @MessagePattern('find_unique_member')
  async findUnique(data: { id: string }) {
    console.log('id', data.id);
    return await this.memberService.findUnique(data.id);
  }

  @MessagePattern('find_many_member')
  async findMany(data: MemberFindManyDto) {
    return await this.memberService.findMany(data);
  }
}
