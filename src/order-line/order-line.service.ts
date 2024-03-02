import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderLineDto } from './dto/create-order-line.dto';
import { UpdateOrderLineDto } from './dto/update-order-line.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { OrderLine } from '@prisma/client';

@Injectable()
export class OrderLineService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrderLines(): Promise<OrderLine[]> {
    // Logic to fetch all order lines from a data source
    return this.prismaService.orderLine.findMany({
      where: { deletedAt: null },
    });
  }

  async getOrderLineById(id: number): Promise<OrderLine> {
    // Logic to fetch an order line by its ID from a data source
    const orderLine = await this.prismaService.orderLine.findUnique({
      where: { id, deletedAt: null },
    });
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return orderLine;
  }

  async createOrderLine(
    createOrderLineDto: CreateOrderLineDto,
  ): Promise<OrderLine> {
    return this.prismaService.orderLine.create({
      data: {
        ...createOrderLineDto,
        createdAt: new Date(),
      },
    });
  }

  async updateOrderLine(
    id: number,
    updateOrderLineDto: UpdateOrderLineDto,
  ): Promise<OrderLine> {
    const orderLine = await this.prismaService.orderLine.findUnique({
      where: { id, deletedAt: null },
    });
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return this.prismaService.orderLine.update({
      where: { id },
      data: {
        ...updateOrderLineDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<OrderLine> {
    const orderLine = await this.prismaService.orderLine.findUnique({
      where: { id, deletedAt: null },
    });
    if (!orderLine) {
      throw new NotFoundException(`Order line with ID ${id} not found`);
    }
    return this.prismaService.orderLine.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
