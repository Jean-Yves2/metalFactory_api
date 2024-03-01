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
} from '@nestjs/common';

import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.getAllOrders();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.softDelete(id);
  }
}
