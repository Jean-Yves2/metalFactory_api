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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WarehouseService } from './warehouse.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les entrepôts' })
  findAll() {
    return this.warehouseService.getAllWarehouses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un entrepôt par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.getWarehouseById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel entrepôt' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return this.warehouseService.createWarehouse(createWarehouseDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un entrepôt existant' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehouseService.updateWarehouse(id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) un entrepôt par son ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.warehouseService.softDelete(id);
  }
}
