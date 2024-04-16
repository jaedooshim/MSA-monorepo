import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { BcryptModule } from '@app/bcrypt';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [PrismaModule, BcryptModule, JwtModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
  exports: [MemberService],
})
export class MemberModule {}
