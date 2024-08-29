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
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  findAll() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.getWarehouseById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(createWarehouseDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.updateWarehouse(id, updateWarehouseDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.softDelete(id);
  }
}
