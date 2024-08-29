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
import { StockService } from './stock.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findAll() {
    return this.stockService.getAllStocks();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.getStockById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createStockDto: CreateStockDto) {
    return this.stockService.createStock(createStockDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStockDto: UpdateStockDto,
  ) {
    return this.stockService.updateStock(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.stockService.softDelete(id);
  }
}
