import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NonMemberBoardDeleteDto {
  @IsNotEmpty()
  @IsString()
  authKey: string;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
