import { $Enums } from '@prisma/client';

export interface IOrderCreate {
  productId: number;
  memberId?: string;
  authKey?: string;
  orderStatus: $Enums.OrderStatus;
}
