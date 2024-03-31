import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Delivery } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDeliveries(): Promise<Delivery[]> {
    try {
      return await this.prismaService.delivery.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting all deliveries');
    }
  }

  async getDeliveryById(id: number): Promise<Delivery> {
    try {
      const delivery = await this.prismaService.delivery.findUnique({
        where: { id, deletedAt: null },
      });
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return delivery;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error getting delivery with id ${id}`,
      );
    }
  }

  async createDelivery(
    createDeliveryDto: CreateDeliveryDto,
  ): Promise<Delivery> {
    try {
      const { orderId, deliveryCompanyId, ...rest } = createDeliveryDto;
      return await this.prismaService.delivery.create({
        data: {
          ...rest,
          order: {
            connect: {
              id: orderId,
            },
          },
          deliveryCompany: {
            connect: {
              id: deliveryCompanyId,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating delivery');
    }
  }

  async updateDelivery(
    id: number,
    updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    const delivery = await this.prismaService.delivery.findUnique({
      where: { id },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    try {
      return await this.prismaService.delivery.update({
        where: { id },
        data: {
          ...updateDeliveryDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating delivery with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<Delivery> {
    const delivery = await this.prismaService.delivery.findUnique({
      where: { id },
    });
    if (!delivery) {
      throw new NotFoundException(`Delivery with ID ${id} not found`);
    }

    try {
      return await this.prismaService.delivery.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting delivery with id ${id}`,
      );
    }
  }
}
