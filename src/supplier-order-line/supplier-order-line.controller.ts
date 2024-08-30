import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { CreateSupplierOrderLineDto } from './dto/create-supplier-order-line.dto';

@Controller('supplier-order-line')
export class SupplierOrderLineController {
  constructor(
    private readonly supplierOrderLineService: SupplierOrderLineService,
  ) {}

  @Get()
  async getAllSupplierOrderLines() {
    return this.supplierOrderLineService.getAllSupplierOrderLines();
  }

  @Get(':id')
  async getSupplierOrderLineById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderLineService.getSupplierOrderLineById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createSupplierOrderLine(@Body() createDto: CreateSupplierOrderLineDto) {
    return this.supplierOrderLineService.createSupplierOrderLine(createDto);
  }

  @Put(':id')
  async updateSupplierOrderLine(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateSupplierOrderLineDto,
  ) {
    return this.supplierOrderLineService.updateSupplierOrderLine(id, createDto);
  }

  @Delete(':id')
  async deleteSupplierOrderLine(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderLineService.deleteSupplierOrderLine(id);
  }
}
