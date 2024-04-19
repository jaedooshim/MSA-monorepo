import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@app/jwt';
import { Observable } from 'rxjs';
import { IRequest } from '@app/jwt/types/payload.interface';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: IRequest): Promise<boolean> {
    let accessToken = req.headers.authorization;
    if (!accessToken) return false;
    accessToken = accessToken.split(' ')[1];
    console.log('accessToken', accessToken);

    const payload = this.jwtService.adminVerify(accessToken);
    if (typeof payload === 'string') throw new UnauthorizedException('해당하는 권한이 없습니다.');

    req.admin = payload;
    return true;
  }
}
