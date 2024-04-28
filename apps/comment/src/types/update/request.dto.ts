import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class CommentParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
