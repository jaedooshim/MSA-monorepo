import { IsDecimal, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { status } from '@prisma/client';

export class ProductUpdateDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '상품이름에는 최소 1글자 이상이 필요합니다.' })
  name?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsDecimal()
  price?: string;

  @IsOptional()
  @IsEnum(status)
  status?: status;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}

export class ProductParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
