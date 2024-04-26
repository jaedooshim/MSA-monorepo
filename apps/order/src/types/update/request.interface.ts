import { $Enums } from '@prisma/client';

export interface IOrderUpdate {
  orderStatus?: $Enums.OrderStatus;
  authKey?: string;
  memberId?: string;
  productId?: number;
}

export interface IOrderAdminUpdate {
  orderStatus: $Enums.OrderStatus;
  adminId?: string;
  productId?: number;
}
