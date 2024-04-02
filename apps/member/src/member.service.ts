import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(private memberRepository: MemberRepository) {}

  async create(data: IMemberCreate): Promise<string> {
    await this.memberRepository.create(data);
    return '멤버가 정상적으로 생성되었습니다.';
  }
}
