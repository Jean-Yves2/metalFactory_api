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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  async findAll() {
    return await this.deliveryService.getAllDeliveries();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const delivery = await this.deliveryService.getDeliveryById(id);
    if (!delivery) {
      throw new NotFoundException(`Delivery with id ${id} not found`);
    }
    return delivery;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeliveryDto: CreateDeliveryDto) {
    try {
      return await this.deliveryService.createDelivery(createDeliveryDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating delivery');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    try {
      const delivery = await this.deliveryService.updateDelivery(
        id,
        updateDeliveryDto,
      );
      if (!delivery) {
        throw new NotFoundException(`Delivery with id ${id} not found`);
      }
      return delivery;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating delivery with id ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const deleted = await this.deliveryService.softDelete(id);
    if (!deleted) {
      throw new NotFoundException(`Delivery with id ${id} not found`);
    }
    return deleted;
  }
}
