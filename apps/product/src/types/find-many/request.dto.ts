import { IsNotEmpty, IsNumber } from 'class-validator';

export class ProductFindMany {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
