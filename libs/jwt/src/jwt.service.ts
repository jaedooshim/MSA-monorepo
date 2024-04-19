import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';
import { IAdminPayload, IPayload } from '@app/jwt/types/payload.interface';

@Injectable()
export class JwtService {
  constructor(private configService: ConfigService) {}

  sign(member: IPayload): string {
    const { id, email, role } = member;
    return sign({ id, email, role }, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN')!,
    });
  }

  adminSign(admin: IAdminPayload): string {
    const { id, email, role } = admin;
    return sign({ id, email, role }, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES_IN')!,
    });
  }

  verify(accessToken: string): IPayload | string {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!) as IPayload;
    } catch (error) {
      return error.message as string;
    }
  }

  adminVerify(accessToken: string): IAdminPayload | string {
    try {
      return verify(accessToken, this.configService.get<string>('ACCESS_TOKEN_SECRET_KEY')!) as IAdminPayload;
    } catch (error) {
      return error.message as string;
    }
  }
}
