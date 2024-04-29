import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentFindMany {
  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;
}
