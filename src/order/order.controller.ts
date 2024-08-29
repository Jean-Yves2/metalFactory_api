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
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  async getOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() createOrderDto: CreateOrderDto,
  ) {
    return this.orderService.updateOrder(id, createOrderDto);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.deleteOrder(id);
  }
}
