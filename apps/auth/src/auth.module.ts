import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptModule } from '@app/bcrypt';
import { MemberModule } from '../../member/src/member.module';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [BcryptModule, MemberModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
