import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './types/request.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('admin')
  async adminLogin(@Body() body: LoginDto) {
    return await this.authService.adminLogin(body);
  }
}
