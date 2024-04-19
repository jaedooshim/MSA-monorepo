import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@app/jwt';
import { MemberService } from '../../member/src/member.service';
import { BcryptService } from '@app/bcrypt';
import { ILogin } from './types/request.interface';
import { AdminService } from '../../admin/src/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private memberService: MemberService,
    private bcryptService: BcryptService,
    private adminService: AdminService,
  ) {}

  async login(data: ILogin) {
    const member = await this.memberService.findEmail(data.email);
    const validPassword = await this.bcryptService.compare(data.password, member.password);
    if (!validPassword) throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    const payload = { id: member.id, email: member.email, role: member.role };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async adminLogin(data: ILogin) {
    const admin = await this.adminService.findUniqueEmail(data.email);
    const validPassword = await this.bcryptService.compare(data.password, admin.password);
    if (!validPassword) throw new BadRequestException('비밀번호가 일치하지 않습니다.');

    const payload = { id: admin.id, email: admin.email, role: admin.role };
    const aceessToken = this.jwtService.adminSign(payload);
    return aceessToken;
  }
}
