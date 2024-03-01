import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    // Logic to fetch all orders from a data source
    return this.prismaService.order.findMany({
      where: { deletedAt: null },
    });
  }

  async getOrderById(id: number): Promise<Order> {
    // Logic to fetch an order by its ID from a data source
    const order = await this.prismaService.order.findUnique({
      where: { id, deletedAt: null },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.prismaService.order.create({
      data: {
        ...createOrderDto,
        createdAt: new Date(),
      },
    });
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: { id, deletedAt: null },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.prismaService.order.update({
      where: { id },
      data: {
        ...updateOrderDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Order> {
    const order = await this.prismaService.order.findUnique({
      where: { id, deletedAt: null },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.prismaService.order.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
