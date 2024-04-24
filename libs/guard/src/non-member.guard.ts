import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@app/jwt';
import { Observable } from 'rxjs';
import { IRequest } from '@app/jwt/types/payload.interface';

@Injectable()
export class NonMemberGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: IRequest = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(req: IRequest): Promise<boolean> {
    let accessToken = req.headers.authorization;
    console.log(accessToken);
    if (!accessToken) {
      req.isGuest = true;
      return true;
    }
    accessToken = accessToken.split(' ')[1];

    const payload = this.jwtService.verify(accessToken);
    if (typeof payload === 'string') throw new UnauthorizedException(payload);
    req.member = payload;
    req.isGuest = false;

    return true;
  }
}
