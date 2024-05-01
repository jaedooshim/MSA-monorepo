import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CategoryCreate } from '../../../category/src/types/create/request.dto';
import { OperatorsRoleGuard } from '@app/guard/operators.role.guard';
import { CategoryParamDto, CategoryUpdateDto } from '../../../category/src/types/update/request.dto';
import { FindManyDto } from '../../../category/src/types/find-many/request.dto';

@Controller('categories')
export class CategoriesController {
  constructor(@Inject('CATEGORY_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseGuards(OperatorsRoleGuard)
  async create(@Body() body: CategoryCreate) {
    return this.client.send<string>('create_category', { ...body });
  }

  @Patch(':id')
  @UseGuards(OperatorsRoleGuard)
  async update(@Body() body: CategoryUpdateDto, @Param() param: CategoryParamDto) {
    return this.client.send<string>('update_category', { id: param.id, body });
  }

  @Delete(':id')
  @UseGuards(OperatorsRoleGuard)
  async delete(@Param() param: CategoryParamDto) {
    return this.client.send<string>('delete_category', { id: param.id });
  }

  @Get(':id')
  async findUnique(@Param() param: CategoryParamDto) {
    return this.client.send<string>('find_unique_category', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: FindManyDto) {
    return this.client.send<string>('find_many_category', query);
  }
}
