import { IsNotEmpty, IsString } from 'class-validator';

export class OrderDeleteNonMemberDto {
  @IsNotEmpty()
  @IsString()
  authKey: string;
}
