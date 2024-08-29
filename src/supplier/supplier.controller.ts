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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  async getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  @Get(':id')
  async getSupplierById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getSupplierById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Put(':id')
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    return this.supplierService.updateSupplier(id, createSupplierDto);
  }

  @Delete(':id')
  async deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.softeDeleteSupplier(id);
  }
}
