import { IsNumber, IsOptional } from 'class-validator';

export class NonMemberBoardDeleteDto {
  @IsOptional()
  @IsNumber()
  orderId?: number;
}
