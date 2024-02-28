import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Delivery } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAllDeliveries(): Promise<Delivery[]> {
    // Logic to fetch all deliveries from a data source
    return this.prismaService.delivery.findMany({
      where: { deletedAt: null },
    });
  }

  async getDeliveryById(id: number): Promise<Delivery> {
    // Logic to fetch a delivery by its ID from a data source
    const delivery = await this.prismaService.delivery.findUnique({
      where: { id, deletedAt: null },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }
    return delivery;
  }

  async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery> {
    // Logic to create a new delivery in a data source
    const { orderId, ...rest } = createDeliveryDto;
    return this.prismaService.delivery.create({
      data: { orderId: Number(orderId), ...rest } as any, // Cast orderId to any type
    });
  }

  async updateDelivery(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    // Logic to update an existing delivery in a data source
    const { orderId, ...rest } = updateDeliveryDto;
    return this.prismaService.delivery.update({
      where: { id },
      data: { orderId: Number(orderId), ...rest } as any, // Cast orderId to any type
    });
  }

  async softDelete(id: number): Promise<Delivery> {
    return this.prismaService.delivery.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
