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
import { ApiOperation } from '@nestjs/swagger'; // Importation de l'ApiOperation
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de toutes les commandes' })
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une commande par son ID' })
  async getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande' })
  @UsePipes(ValidationPipe)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande existante' })
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.updateOrder(id, createOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une commande' })
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
