import { $Enums } from '@prisma/client';

export interface IProductUpdate {
  name?: string;
  content?: string;
  price?: string;
  status?: $Enums.status;
  categoryId?: number;
}
