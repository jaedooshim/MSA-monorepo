import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsString()
  memberId: string;

  @IsOptional()
  @IsString()
  adminId: string;
}
