import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { MembersModule } from './members/members.module';
import { AuthsModule } from './auths/auths.module';

@Module({
  imports: [MembersModule, AuthsModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
