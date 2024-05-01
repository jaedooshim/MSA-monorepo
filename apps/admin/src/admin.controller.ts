import { Controller } from '@nestjs/common';
import { AdminService } from './admin.service';
import { adminFindManyDto } from './types/find-many/request.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @MessagePattern('create_admin')
  async create(body: Prisma.AdminUncheckedCreateInput): Promise<string> {
    return await this.adminService.create(body);
  }

  @MessagePattern('update_admin')
  async update(data: { id: string; body: Prisma.AdminUncheckedUpdateInput }): Promise<string> {
    return await this.adminService.update(data.id, data.body);
  }

  @MessagePattern('update_password')
  async updatePassword(@Payload() payload: { id: string; oldPassword: string; newPassword: string }): Promise<string> {
    return await this.adminService.updatePassword(payload.id, payload.oldPassword, payload.newPassword);
  }

  @MessagePattern('delete_admin')
  async delete(data: { id: string }): Promise<string> {
    return await this.adminService.softDelete(data.id);
  }

  @MessagePattern('find_unique_admin')
  async getAdmin(data: { id: string }) {
    return await this.adminService.findUnique(data.id);
  }

  @MessagePattern('find_many_admin')
  async findMany(data: adminFindManyDto) {
    return await this.adminService.findMany(data);
  }
}
