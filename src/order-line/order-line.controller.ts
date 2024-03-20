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
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';

@Controller('order-line')
export class OrderLineController {
  constructor(private readonly orderLineService: OrderLineService) {}

  @Get()
  async findAll() {
    return this.orderLineService.getAllOrderLines();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const orderLine = await this.orderLineService.getOrderLineById(id);
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderLineDto: CreateOrderLineDto) {
    return this.orderLineService.createOrderLine(createOrderLineDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderLineDto: UpdateOrderLineDto,
  ) {
    const orderLine = await this.orderLineService.updateOrderLine(
      id,
      updateOrderLineDto,
    );
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }

  @Delete(':id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    const orderLine = await this.orderLineService.softDelete(id);
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }
}
