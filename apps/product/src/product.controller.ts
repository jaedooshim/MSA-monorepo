import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { SalesRoleGuard } from '@app/guard/sales.role.guard';
import { ProductCreateDto } from './types/create/request.dto';
import { Sales } from '@app/decorators/sales.decorator';
import { ProductParamDto, ProductUpdateDto } from './types/update/request.dto';
import { Product } from '@prisma/client';
import { ProductFindMany } from './types/find-many/request.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(SalesRoleGuard)
  async create(@Body() body: ProductCreateDto, @Sales() sales): Promise<string> {
    const data = { ...body, adminId: sales.id };
    return await this.productService.create(data);
  }

  @Put(':id')
  @UseGuards(SalesRoleGuard)
  async update(@Body() body: ProductUpdateDto, @Sales() sales, @Param() param: ProductParamDto): Promise<string> {
    const data = { ...body, adminId: sales.id };
    return await this.productService.update(param.id, data, sales.id);
  }

  @Delete(':id')
  @UseGuards(SalesRoleGuard)
  async delete(@Param() param: ProductParamDto, @Sales() sales): Promise<string> {
    return await this.productService.softDelete(param.id, sales.id);
  }

  @Get(':id')
  async getProduct(@Param() param: ProductParamDto): Promise<Product> {
    return await this.productService.findUnique(param.id);
  }

  @Get()
  async findMany(@Query() query: ProductFindMany) {
    return this.productService.findMany(query);
  }
}
