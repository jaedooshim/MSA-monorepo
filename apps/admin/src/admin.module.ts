import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRepository } from './admin.repository';
import { PrismaModule } from '../../../libs/prisma/prisma.module';
import { BcryptModule } from '@app/bcrypt';
import { JwtModule } from '@app/jwt';

@Module({
  imports: [PrismaModule, BcryptModule, JwtModule],
  controllers: [AdminController],
  providers: [AdminService, AdminRepository],
  exports: [AdminService],
})
export class AdminModule {}
