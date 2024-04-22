import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryCreate } from './types/create/request.dto';
import { OperatorsRoleGuard } from '@app/guard/operators.role.guard';
import { CategoryParamDto, CategoryUpdateDto } from './types/update/request.dto';
import { Category } from '@prisma/client';
import { FindManyDto } from './types/find-many/request.dto';

@Controller('categorys')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(OperatorsRoleGuard)
  async create(@Body() body: CategoryCreate): Promise<string> {
    return await this.categoryService.create(body);
  }

  @Patch(':id')
  @UseGuards(OperatorsRoleGuard)
  async update(@Body() body: CategoryUpdateDto, @Param() param: CategoryParamDto): Promise<string> {
    return await this.categoryService.update(param.id, body);
  }

  @Delete(':id')
  @UseGuards(OperatorsRoleGuard)
  async delete(@Param() param: CategoryParamDto): Promise<string> {
    return await this.categoryService.softDelete(param.id);
  }

  @Get(':id')
  async findUnique(@Param() param: CategoryParamDto): Promise<Category> {
    return await this.categoryService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: FindManyDto) {
    return this.categoryService.findMany(query);
  }
}
