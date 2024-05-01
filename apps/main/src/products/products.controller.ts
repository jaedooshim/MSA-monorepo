import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductCreateDto } from '../../../product/src/types/create/request.dto';
import { Sales } from '@app/decorators/sales.decorator';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { ProductParamDto, ProductUpdateDto } from '../../../product/src/types/update/request.dto';
import { ProductFindMany } from '../../../product/src/types/find-many/request.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

  @Post()
  @UseGuards(SalesRoleGuard)
  async create(@Body() body: ProductCreateDto, @Sales() sales) {
    return this.client.send<string>('create_product', { ...body, adminId: sales.id });
  }

  @Put(':id')
  @UseGuards(SalesRoleGuard)
  async update(@Body() body: ProductUpdateDto, @Param() param: ProductParamDto, @Sales() sales) {
    return this.client.send<string>('update_product', { id: param.id, body, adminId: sales.id });
  }

  @Delete(':id')
  @UseGuards(SalesRoleGuard)
  async delete(@Param() param: ProductParamDto, @Sales() sales) {
    return this.client.send<string>('delete_product', { id: param.id, adminId: sales.id });
  }

  @Get(':id')
  async findUnique(@Param() param: ProductParamDto) {
    return this.client.send<string>('find_unique_product', { id: param.id });
  }

  @Get()
  async findMany(@Query() query: ProductFindMany) {
    return this.client.send<string>('find_many_product', query);
  }
}
