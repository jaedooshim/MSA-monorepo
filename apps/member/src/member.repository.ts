import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IMemberCreate } from './types/create/request.interface';
import { Member } from '@prisma/client';
import { IMemberUpdate } from './types/update/request.interface';
import { IMemberFindMany } from './types/find-many/request.interface';

@Injectable()
export class MemberRepository {
  constructor(private prisma: PrismaService) {}

  private memberRepository = this.prisma.extendedClient.member;

  async create(data: IMemberCreate): Promise<Member> {
    return this.memberRepository.create({ data });
  }

  async update(id: string, data: IMemberUpdate): Promise<Member> {
    return this.memberRepository.update({ where: { id }, data: { ...data } });
  }

  async softDelete(id: string): Promise<Member> {
    return this.memberRepository.softDelete({ id });
  }

  async updatePassword(id: string, newPassword: string) {
    const member = await this.memberRepository.findFirst({ where: { id } });
    member.password = newPassword;
    return await this.memberRepository.update({ where: { id }, data: { password: newPassword } });
  }

  async findMany(data: IMemberFindMany) {
    return this.prisma.member.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findUniqueOrThrow(id: string) {
    const member = await this.memberRepository.findFirst({ where: { id } });
    if (!member) throw new ConflictException('해당하는 멤버를 찾을 수 없습니다.');
    return member;
  }

  async isValidEmail(email: string) {
    const existEmail = await this.memberRepository.findFirst({ where: { email } });
    if (existEmail) throw new ConflictException('이미 등록된 이메일입니다. \n 다시 한번 확인해주세요.');
  }
}
