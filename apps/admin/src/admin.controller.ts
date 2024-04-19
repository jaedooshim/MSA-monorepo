import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCreateDto } from './types/create/request.dto';
import { AdminParamDto, UpdateAdminDto, UpdatePasswordDto } from './types/update/request.dto';
import { adminFindManyDto } from './types/find-many/request.dto';
import { AdminAuthGuard } from '@app/guard/admin.auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() body: AdminCreateDto): Promise<string> {
    return await this.adminService.create(body);
  }

  @Put(':id')
  @UseGuards(AdminAuthGuard)
  async update(@Body() body: UpdateAdminDto, @Param() param: AdminParamDto): Promise<string> {
    return await this.adminService.update(param.id, body);
  }

  @Patch(':id')
  @UseGuards(AdminAuthGuard)
  async updatePassword(@Param() param: AdminParamDto, @Body() body: UpdatePasswordDto) {
    return await this.adminService.updatePassword(param.id, body.oldPassword, body.newPassword);
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  async delete(@Param() param: AdminParamDto): Promise<string> {
    return await this.adminService.softDelete(param.id);
  }

  @Get(':id')
  async getAdmin(@Param() param: AdminParamDto) {
    return await this.adminService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: adminFindManyDto) {
    return await this.adminService.findMany(query);
  }
}
