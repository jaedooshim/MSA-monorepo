import { ConflictException, Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { BcryptService } from '@app/bcrypt';
import { IFindMany } from './types/find-many/request.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private adminRepository: AdminRepository,
    private bcryptService: BcryptService,
  ) {}

  async create(data: Prisma.AdminUncheckedCreateInput): Promise<string> {
    await this.adminRepository.isValidEmail(data.email);
    await this.adminRepository.isValidPhoneNumber(data.phoneNumber);
    data.password = await this.bcryptService.hash(data.password);
    await this.adminRepository.create(data);
    return '가입이 정상적으로 처리되었습니다.';
  }

  async update(id: string, data: Prisma.AdminUncheckedUpdateInput): Promise<string> {
    const admin = await this.findUnique(id);
    if (typeof data.email === 'string' && admin.email !== data.email) {
      await this.adminRepository.isValidEmail(data.email);
    }
    if (typeof data.phoneNumber === 'string' && admin.phoneNumber !== data.phoneNumber) {
      await this.adminRepository.isValidPhoneNumber(data.phoneNumber);
    }
    await this.adminRepository.update(id, data);
    return '관리자 정보 수정이 완료되었습니다.';
  }

  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> {
    const admin = await this.adminRepository.findUniqueOrThrow(id);
    const password = await this.bcryptService.compare(oldPassword, admin.password);
    if (!password) throw new ConflictException('비밀번호가 일치하지 않습니다.');
    if (oldPassword === newPassword) throw new ConflictException('현재 비밀번호와 일치합니다. \n 새로운 비밀번호를 입력해주세요.');
    const hashPassword = await this.bcryptService.hash(newPassword);
    await this.adminRepository.updatePassword(id, hashPassword);
    return '비밀번호가 정상적으로 변경되었습니다.';
  }

  async softDelete(id: string): Promise<string> {
    await this.adminRepository.findUniqueOrThrow(id);
    await this.adminRepository.softDelete(id);
    return '관리자정보가 정상적으로 삭제되었습니다.';
  }
  async findUnique(id: string) {
    return await this.adminRepository.findUniqueOrThrow(id);
  }

  async findMany(data: IFindMany) {
    return await this.adminRepository.findMany(data);
  }

  async findUniqueEmail(email: string) {
    return await this.adminRepository.findUniqueEmail(email);
  }
}
