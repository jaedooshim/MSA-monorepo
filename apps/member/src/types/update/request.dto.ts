import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { memberRole } from '@prisma/client';

export class UpdateMemberDto {
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
  @IsEnum(memberRole)
  role?: memberRole;
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

export class MemberParamDto {
  @IsNotEmpty()
  @IsString()
  id?: string;
}
