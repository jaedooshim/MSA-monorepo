import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto } from '../../../auth/src/types/request.dto';

@Controller('auths')
export class AuthsController {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  @Post('member')
  async login(@Body() body: LoginDto) {
    return this.client.send<string>('member_login', { email: body.email, password: body.password });
  }

  @Post('admin')
  async adminLogin(@Body() body: LoginDto) {
    return this.client.send<string>('admin_login', { email: body.email, password: body.password });
  }
}
