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
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @Get()
  findAll() {
    return this.deliveryService.getAllDeliveries();
    // Logique pour récupérer toutes les livraisons
  }

  @Get()
  @Get(':id')
  findOne(@Param('id') id: number) {
    // Logique pour récupérer une livraison par son ID
    return this.deliveryService.getDeliveryById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    // Logique pour créer une nouvelle livraison
    return this.deliveryService.createDelivery(createDeliveryDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    // Logique pour mettre à jour une livraison
    return this.deliveryService.updateDelivery(id, updateDeliveryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    // Logique pour supprimer une livraison
    return this.deliveryService.softDelete(id);
  }
}
