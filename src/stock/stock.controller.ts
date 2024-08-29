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
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@ApiTags('stock')
@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les stocks' })
  findAll() {
    return this.stockService.getAllStocks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un stock par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.getStockById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau stock' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStock(createStockDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un stock existant' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.updateStock(id, updateStockDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) un stock par son ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.softDelete(id);
  }
}
