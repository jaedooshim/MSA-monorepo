import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';

@Injectable()
export class NonmemberBoardRepository {
  constructor(private prisma: PrismaService) {}

  private nonmemberBoardRepository = this.prisma.extendedClient.nonMemberBoards;
}
