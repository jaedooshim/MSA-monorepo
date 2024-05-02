import { Controller } from '@nestjs/common';
import { NonmemberBoardService } from './nonmember_board.service';
import { NonMemberBoardCreateDto } from './types/create/request.dto';
import { NonMemberBoardUpdateDto } from './types/update/request.dto';
import { NonMemberBoardDeleteDto } from './types/delete/request.dto';
import { NonMemberBoardFindManyDto } from './types/find-many/request.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('nonmemberboards')
export class NonmemberBoardController {
  constructor(private readonly nonmemberBoardService: NonmemberBoardService) {}

  @MessagePattern('create_nonmember_board')
  async create(body: NonMemberBoardCreateDto): Promise<string> {
    return await this.nonmemberBoardService.create(body);
  }

  @MessagePattern('update_nonmember_board')
  async update(data: { id: number; body: NonMemberBoardUpdateDto }): Promise<string> {
    return await this.nonmemberBoardService.update(data.id, data.body);
  }

  @MessagePattern('delete_nonmember_board')
  async delete(data: { id: number; body: NonMemberBoardDeleteDto }): Promise<string> {
    return await this.nonmemberBoardService.softDelete(data.id, data.body);
  }

  @MessagePattern('find_unique_nonmember_board')
  async findUnique(data: { id: number }) {
    return await this.nonmemberBoardService.findUnique(data.id);
  }

  @MessagePattern('find_many_nonmember_board')
  async findMany(data: NonMemberBoardFindManyDto) {
    return await this.nonmemberBoardService.findMany(data);
  }
}
