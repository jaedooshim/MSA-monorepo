import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import { IAdminCreate } from './types/create/request.interface';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  async create(data: IAdminCreate): Promise<string> {
    await this.adminRepository.create(data);
    return '가입이 정상적으로 처리되었습니다.';
  }
}
