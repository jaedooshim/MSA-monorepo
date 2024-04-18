import { $Enums } from '@prisma/client';

export interface IAdminCreate {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  subAddress: string;
  role: $Enums.adminRole;
}
