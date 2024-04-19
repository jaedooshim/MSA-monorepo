import { IsNotEmpty, IsNumber } from 'class-validator';

export class adminFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
