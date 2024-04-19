import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryUpdateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(8)
  name: string;
}

export class CategoryParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
