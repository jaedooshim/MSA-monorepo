import { IsEmail, IsEnum, IsNotEmpty, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { $Enums } from '@prisma/client';

export class AdminCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(20)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  @MaxLength(16, { message: '비밀번호는 최소 8~16자로 설정해야합니다.' })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Length(13, 13)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subAddress: string;

  @IsEnum()
  @IsNotEmpty()
  role: $Enums.adminRole;
}
