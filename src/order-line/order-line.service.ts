import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { OrderLine } from '@prisma/client';

@Injectable()
export class OrderLineService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrderLines(): Promise<OrderLine[]> {
    try {
      return await this.prismaService.orderLine.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all order lines');
    }
  }

  async getOrderLineById(id: number): Promise<OrderLine> {
    try {
      const orderLine = await this.prismaService.orderLine.findUnique({
        where: { id, deletedAt: null },
      });
      if (!orderLine) {
        throw new NotFoundException(`Order line with ID ${id} not found`);
      }
      return orderLine;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching order line with id ${id}`,
      );
    }
  }

  async createOrderLine(
    createOrderLineDto: CreateOrderLineDto,
  ): Promise<OrderLine> {
    try {
      return await this.prismaService.orderLine.create({
        data: {
          ...createOrderLineDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating order line');
    }
  }

  async updateOrderLine(
    id: number,
    updateOrderLineDto: UpdateOrderLineDto,
  ): Promise<OrderLine> {
    try {
      const orderLine = await this.prismaService.orderLine.findUnique({
        where: { id, deletedAt: null },
      });
      if (!orderLine) {
        throw new NotFoundException(`Order line with ID ${id} not found`);
      }
      return await this.prismaService.orderLine.update({
        where: { id },
        data: {
          ...updateOrderLineDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating order line with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<OrderLine> {
    try {
      const orderLine = await this.prismaService.orderLine.findUnique({
        where: { id, deletedAt: null },
      });
      if (!orderLine) {
        throw new NotFoundException(`Order line with ID ${id} not found`);
      }
      return await this.prismaService.orderLine.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error deleting order line with id ${id}`,
      );
    }
  }
}
