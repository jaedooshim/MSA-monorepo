import { IsNotEmpty, IsNumber } from 'class-validator';

export class OrderFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
