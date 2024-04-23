import { IsDecimal, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: '상품이름에는 최소 1글자 이상이 필요합니다.' })
  name: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsDecimal()
  price: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
