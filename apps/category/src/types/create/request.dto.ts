import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryCreate {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  name: string;
}
