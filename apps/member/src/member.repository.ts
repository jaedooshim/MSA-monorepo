import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  async create(data: IMemberCreate): Promise<Member> {
    return this.memberRepository.create({ data });
  }
}
