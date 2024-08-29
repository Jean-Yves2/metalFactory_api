import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { SupplierOrderService } from './supplier-order.service';
import { CreateSupplierOrderDto } from './dto/create-supplier-order.dto';
import { UpdateSupplierOrderDto } from './dto/update-supplier-order.dto';

@Controller('supplier-order')
export class SupplierOrderController {
  constructor(private readonly supplierOrderService: SupplierOrderService) {}

  @Get()
  findAll() {
    return this.supplierOrderService.getAllSupplierOrders();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderService.getSupplierOrderById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSupplierOrderDto: CreateSupplierOrderDto) {
    return this.supplierOrderService.createSupplierOrder(
      createSupplierOrderDto,
    );
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierOrderDto: UpdateSupplierOrderDto,
  ) {
    return this.supplierOrderService.updateSupplierOrder(
      id,
      updateSupplierOrderDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderService.softDelete(id);
  }
}
