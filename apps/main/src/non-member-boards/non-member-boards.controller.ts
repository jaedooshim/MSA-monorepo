import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { NonMemberBoardCreateDto } from '../../../nonmember_board/src/types/create/request.dto';
import { NonMemberBoardParamDto, NonMemberBoardUpdateDto } from '../../../nonmember_board/src/types/update/request.dto';
import { NonMemberBoardDeleteDto } from '../../../nonmember_board/src/types/delete/request.dto';
import { NonMemberBoardFindManyDto } from '../../../nonmember_board/src/types/find-many/request.dto';

@Controller('nonmember_boards')
export class NonMemberBoardsController {
  constructor(@Inject('NONMEMBER_BOARD_SERVICE') private client: ClientProxy) {}

  @Post()
  async create(@Body() body: NonMemberBoardCreateDto) {
    return this.client.send<string>('create_nonmember_board', body);
  }

  @Put(':id')
  async update(@Body() body: NonMemberBoardUpdateDto, @Param() param: NonMemberBoardParamDto) {
    return this.client.send<string>('update_nonmember_board', { id: param.id, body });
  }

  @Delete(':id')
  async delete(@Body() body: NonMemberBoardDeleteDto, @Param() param: NonMemberBoardParamDto) {
    return this.client.send<string>('delete_nonmember_board', { id: param.id, body });
  }

  @Get(':id')
  async findUnique(@Param() param: NonMemberBoardParamDto) {
    return this.client.send<string>('find_unique_nonmember_board', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: NonMemberBoardFindManyDto) {
    return this.client.send<string>('find_many_nonmember_board', query);
  }
}
