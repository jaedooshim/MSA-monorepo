import { $Enums } from '@prisma/client';

export interface IMemberUpdate {
  name?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  subAddress?: string;
  role?: $Enums.memberRole;
  id?: string;
}
