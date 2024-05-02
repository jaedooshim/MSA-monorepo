import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../libs/prisma/prisma.service';
import { INonMemberBoardCreate } from './types/create/request.interface';
import { NonMemberBoards } from '@prisma/client';
import { INonMemberBoardUpdate } from './types/update/request.interface';
import { INonMemberBoardFindMany } from './types/find-many/request.interface';

@Injectable()
export class NonmemberBoardRepository {
  constructor(private prisma: PrismaService) {}

  private nonmemberBoardRepository = this.prisma.extendedClient.nonMemberBoards;

  async create(data: INonMemberBoardCreate): Promise<NonMemberBoards> {
    return await this.nonmemberBoardRepository.create({
      data: {
        title: data.title,
        name: data.name,
        email: data.email,
        content: data.content,
        Order: {
          connect: {
            id: data.orderId,
          },
        },
      },
    });
  }

  async update(id: number, data: INonMemberBoardUpdate): Promise<NonMemberBoards> {
    return await this.nonmemberBoardRepository.update({
      where: { id },
      data: {
        title: data.title,
        name: data.name,
        email: data.email,
        content: data.content,
        Order: {
          connect: { id: data.orderId },
        },
      },
    });
  }

  async softDelete(id: number): Promise<NonMemberBoards> {
    return await this.nonmemberBoardRepository.softDelete({ id });
  }

  async findUniqueOrThrow(id: number): Promise<NonMemberBoards> {
    const board = await this.nonmemberBoardRepository.findFirst({ where: { id } });
    if (!board) throw new NotFoundException('게시글이 존재하지 않습니다.');
    return board;
  }

  async findMany(data: INonMemberBoardFindMany) {
    return await this.prisma.nonMemberBoards.findMany({
      take: data.take,
      skip: (data.page - 1) * data.take,
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
