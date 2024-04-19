import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
