import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async findAll() {
    return this.deliveryService.getAllDeliveries();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryService.getDeliveryById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveryService.createDelivery(createDeliveryDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.updateDelivery(id, updateDeliveryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryService.softDelete(id);
  }
}
