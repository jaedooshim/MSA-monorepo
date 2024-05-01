import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { Admin, Prisma } from '@prisma/client';
import { IFindMany } from './types/find-many/request.interface';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  private adminRepository = this.prisma.extendedClient.admin;

  async create(data: Prisma.AdminUncheckedCreateInput): Promise<Admin> {
    return await this.adminRepository.create({ data });
  }

  async update(id: string, data: Prisma.AdminUncheckedUpdateInput): Promise<Admin> {
    return await this.adminRepository.update({ where: { id }, data });
  }

  async softDelete(id: string): Promise<Admin> {
    return await this.adminRepository.softDelete({ id });
  }

  async updatePassword(id: string, newPassword: string) {
    const admin = await this.adminRepository.findFirst({ where: { id } });
    admin.password = newPassword;
    return await this.adminRepository.update({ where: { id }, data: { password: newPassword } });
  }

  async findMany(data: IFindMany) {
    return this.prisma.admin.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findUniqueOrThrow(id: string) {
    const admin = await this.adminRepository.findFirst({ where: { id } });
    if (!admin) throw new NotFoundException('해당하는 관리자를 찾지 못했습니다.');
    return admin;
  }

  async isValidEmail(email: string) {
    const existEmail = await this.adminRepository.findFirst({ where: { email } });
    if (existEmail) throw new ConflictException('이미 등록된 이메일입니다. \n 다시 한번 확인해주세요.');
  }

  async isValidPhoneNumber(phoneNumber: string) {
    const existPhoneNumber = await this.adminRepository.findFirst({ where: { phoneNumber } });
    if (existPhoneNumber) throw new ConflictException('이미 등록된 전화번호입니다. \n 다시 한번 확인해주세요.');
  }

  async findUniqueEmail(email: string) {
    const findEmail = await this.adminRepository.findFirst({ where: { email } });
    if (!findEmail) throw new NotFoundException('이메일 주소를 찾을 수 없습니다.');
    return findEmail;
  }
}
