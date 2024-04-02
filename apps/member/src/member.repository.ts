import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  // async create(data : )
}
