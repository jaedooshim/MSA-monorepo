import { IsNotEmpty, IsNumber } from 'class-validator';

export class NonMemberBoardFindManyDto {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
