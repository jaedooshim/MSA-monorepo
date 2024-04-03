import { Module } from '@nestjs/common';
import { MainController } from './main.controller';
import { MainService } from './main.service';
import { MembersModule } from './members/members.module';

@Module({
  imports: [MembersModule],
  controllers: [MainController],
  providers: [MainService],
})
export class MainModule {}
