import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { IAdminCreate } from './types/create/request.interface';
import { Admin } from '@prisma/client';

@Injectable()
export class AdminRepository {
  constructor(private prisma: PrismaService) {}

  private adminRepository = this.prisma.extendedClient.admin;

  async create(data: IAdminCreate): Promise<Admin> {
    return await this.adminRepository.create({ data });
  }
}
