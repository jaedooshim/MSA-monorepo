import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './types/create/request.dto';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() body: CreateMemberDto): Promise<string> {
    return await this.memberService.create(body);
  }
}
