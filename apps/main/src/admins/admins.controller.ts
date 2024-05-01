import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdminCreateDto } from '../../../admin/src/types/create/request.dto';
import { AdminRoleGuard } from '@app/guard/admin.role.guard';
import { AdminParamDto, UpdateAdminDto, UpdatePasswordDto } from '../../../admin/src/types/update/request.dto';
import { adminFindManyDto } from '../../../admin/src/types/find-many/request.dto';

@Controller('admins')
export class AdminsController {
  constructor(@Inject('ADMIN_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() body: AdminCreateDto) {
    return this.client.send<string>('create_admin', { ...body });
  }

  @Put(':id')
  @UseGuards(AdminRoleGuard)
  async update(@Body() body: UpdateAdminDto, @Param() param: AdminParamDto) {
    return this.client.send<string>('update_admin', { id: param.id, body });
  }

  @Patch(':id')
  @UseGuards(AdminRoleGuard)
  async updatePassword(@Body() body: UpdatePasswordDto, @Param() param: AdminParamDto) {
    return this.client.send<string>('update_password', { id: param.id, oldPassword: body.oldPassword, newPassword: body.newPassword });
  }

  @Delete(':id')
  @UseGuards(AdminRoleGuard)
  async delete(@Param() param: AdminParamDto) {
    return this.client.send<string>('delete_admin', { id: param.id });
  }

  @Get(':id')
  async findUnique(@Param() param: AdminParamDto) {
    return this.client.send<string>('find_unique_admin', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: adminFindManyDto) {
    return this.client.send<string>('find_many_admin', query);
  }
}
