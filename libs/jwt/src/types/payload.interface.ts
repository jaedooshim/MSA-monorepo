import { $Enums } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export interface IPayload extends JwtPayload {
  id: string;
  email: string | null;
  role: $Enums.memberRole;
}

export interface IAdminPayload extends JwtPayload {
  id: string;
  email: string | null;
  role: $Enums.adminRole;
}
export interface IRequest extends Request {
  member?: IPayload;
  admin?: IAdminPayload;
  isGuest: boolean;
}
