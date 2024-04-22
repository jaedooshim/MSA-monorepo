import { $Enums } from '@prisma/client';

export interface IProductCreate {
  name: string;
  content: string;
  price: bigint;
  status: $Enums.status;
  categoryId: number;
}
