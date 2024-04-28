import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  productId: number;
}
