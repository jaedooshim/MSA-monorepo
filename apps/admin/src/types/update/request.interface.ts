import { $Enums } from '@prisma/client';

export interface IAdminUpdate {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  subAddress?: string;
  role?: $Enums.adminRole;
}
