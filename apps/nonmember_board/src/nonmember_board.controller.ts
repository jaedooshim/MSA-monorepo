import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { NonmemberBoardService } from './nonmember_board.service';
import { NonMemberBoardCreateDto } from './types/create/request.dto';
import { NonMemberBoardParamDto, NonMemberBoardUpdateDto } from './types/update/request.dto';
import { NonMemberBoardDeleteDto } from './types/delete/request.dto';
import { NonMemberBoardFindManyDto } from './types/find-many/request.dto';

@Controller('nonmemberboards')
export class NonmemberBoardController {
  constructor(private readonly nonmemberBoardService: NonmemberBoardService) {}

  @Post()
  async create(@Body() body: NonMemberBoardCreateDto, @Body('authKey') authKey: string): Promise<string> {
    return await this.nonmemberBoardService.create(body, authKey);
  }

  @Put(':id')
  async update(@Body() body: NonMemberBoardUpdateDto, @Body('authKey') authKey: string, @Param() param: NonMemberBoardParamDto): Promise<string> {
    return await this.nonmemberBoardService.update(param.id, body, authKey);
  }

  @Delete(':id')
  async delete(@Body() body: NonMemberBoardDeleteDto, @Body('authKey') authKey: string, @Param() param: NonMemberBoardParamDto): Promise<string> {
    return await this.nonmemberBoardService.softDelete(param.id, body, authKey);
  }

  @Get(':id')
  async findUnique(@Param() param: NonMemberBoardParamDto) {
    return await this.nonmemberBoardService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: NonMemberBoardFindManyDto) {
    return await this.nonmemberBoardService.findMany(query);
  }
}
