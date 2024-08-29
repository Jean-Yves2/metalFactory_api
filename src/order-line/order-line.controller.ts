import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';

@ApiTags('order-line')
@Controller('order-line')
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtenir la liste de toutes les lignes de commande',
  })
  async findAll() {
    return this.orderLineService.getAllOrderLines();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une ligne de commande par son ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderLineService.getOrderLineById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ligne de commande' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderLineDto: CreateOrderLineDto) {
    return this.orderLineService.createOrderLine(createOrderLineDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une ligne de commande existante' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    return this.orderLineService.updateOrderLine(id, updateOrderLineDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer (soft delete) une ligne de commande par son ID',
  })
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    return this.orderLineService.softDelete(id);
  }
}
