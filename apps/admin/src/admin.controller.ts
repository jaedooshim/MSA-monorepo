import { Body, Controller, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminCreateDto } from './types/create/request.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async create(@Body() body: AdminCreateDto): Promise<string> {
    return await this.adminService.create(body);
  }
}
