import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepository } from './member.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { BcryptModule } from '@app/bcrypt';

@Module({
  imports: [PrismaModule, BcryptModule],
  controllers: [MemberController],
  providers: [MemberService, MemberRepository],
})
export class MemberModule {}
