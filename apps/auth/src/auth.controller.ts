import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './types/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('member_login')
  async login(body: LoginDto): Promise<string> {
    return await this.authService.login(body);
  }

  @MessagePattern('admin_login')
  async adminLogin(body: LoginDto): Promise<string> {
    return await this.authService.adminLogin(body);
  }
}
