import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { adminRole, memberRole } from '@prisma/client';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MinLength(10)
  @MaxLength(20)
  email?: string;

  @IsOptional()
  @IsString()
  @Length(13, 13)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  subAddress?: string;

  @IsOptional()
  @IsEnum(adminRole)
  role?: adminRole;
}

export class AdminParamDto {
  @IsNotEmpty()
  @IsString()
  id: string;
}

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  @MaxLength(16, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  @MaxLength(16, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  newPassword: string;
}
