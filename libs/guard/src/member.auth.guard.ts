import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@app/jwt';
import { Observable } from 'rxjs';
import { IRequest } from '@app/jwt/types/payload.interface';

@Injectable()
export class MemberAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: IRequest): Promise<boolean> {
    let accessToken = req.headers.authorization;
    console.log('authorization', accessToken);
    if (!accessToken) throw new UnauthorizedException('비회원은 이용하실 수 없는 서비스입니다.');
    accessToken = accessToken.split(' ')[1];
    // console.log('accessToken', accessToken);

    const payload = this.jwtService.verify(accessToken);
    // console.log('payload', payload);
    if (typeof payload === 'string') throw new UnauthorizedException('권한이 없습니다. 다시 한번 확인해주세요.');

    req.member = payload;
    return true;
  }
}
