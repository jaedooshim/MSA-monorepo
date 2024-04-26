import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class OrderUpdateDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus;

  @IsOptional()
  @IsNumber()
  productId?: number;

  @IsOptional()
  @IsString()
  memberId?: string;

  @IsOptional()
  @IsString()
  authKey?: string;
}

export class OrderParamDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class OrderAdminUpdate {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsOptional()
  @IsString()
  adminId?: string;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
