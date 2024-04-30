import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { BcryptService } from '@app/bcrypt';
import { IMemberFindMany } from './types/find-many/request.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(
    private memberRepository: MemberRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: Prisma.MemberUncheckedCreateInput): Promise<string> {
    await this.memberRepository.isValidEmail(data.email);
    await this.memberRepository.isValidPhoneNumber(data.phoneNumber);
    data.password = await this.bcryptService.hash(data.password);
    await this.memberRepository.create(data);
    return '멤버가 정상적으로 생성되었습니다.';
  }

  async updateOwn(id: string, data: Prisma.MemberUncheckedUpdateInput): Promise<string> {
    const member = await this.memberRepository.findUniqueOrThrow(id);
    if (typeof data.email === 'string' && member.email !== data.email) {
      await this.memberRepository.isValidEmail(data.email);
    }
    if (typeof data.phoneNumber === 'string' && member.phoneNumber !== data.phoneNumber) {
      await this.memberRepository.isValidPhoneNumber(data.phoneNumber);
    }
    await this.memberRepository.update(id, data);
    return '멤버정보가 정상적으로 수정되었습니다.';
  }

  async softDelete(id: string): Promise<string> {
    await this.memberRepository.findUniqueOrThrow(id);
    await this.memberRepository.softDelete(id);
    return '멤버정보가 정상적으로 삭제되었습니다.';
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> {
    console.log('id', id);
    const member = await this.memberRepository.findUniqueOrThrow(id);
    const password = await this.bcryptService.compare(oldPassword, member.password);
    console.log('oldPassword', oldPassword);
    console.log('newPassword', newPassword);
    if (!password) throw new ConflictException('비밀번호가 일치하지 않습니다.');

    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.memberRepository.updatePassword(id, hashPassword);
    return '비밀번호가 변경되었습니다.';
  }

  async findUnique(id: string) {
    return await this.memberRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IMemberFindMany) {
    return await this.memberRepository.findMany(data);
  }

  async findEmail(email: string) {
    return await this.memberRepository.findEmail(email);
  }

  async verifyAccessAuthorityOrThrow(id: string, memberId: string) {
    if (id !== memberId) throw new ForbiddenException('해당 아이디에 대한 권한이 없습니다.');
  }
}
