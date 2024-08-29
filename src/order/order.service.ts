import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  async getOrderById(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    await this.prismaService.order.create({
      data: {
        customerId: createOrderDto.customerId,
        orderDate: new Date(),
        status: createOrderDto.status,
        totalExclTax: createOrderDto.totalExclTax,
        totalInclTax: createOrderDto.totalInclTax,
        deliveryAddressId: createOrderDto.deliveryAddressId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    });
    return 'Order created successfully';
  }

  async updateOrder(id: number, createOrderDto: CreateOrderDto) {
    const order = await this.prismaService.order.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.order.update({
      where: { id: id },
      data: {
        customerId: createOrderDto.customerId,
        orderDate: new Date(),
        status: createOrderDto.status,
        totalExclTax: createOrderDto.totalExclTax,
        totalInclTax: createOrderDto.totalInclTax,
        deliveryAddressId: createOrderDto.deliveryAddressId,
        updatedAt: new Date(),
      },
    });
    return 'Order updated successfully';
  }

  async deleteOrder(id: number) {
    const order = await this.prismaService.order.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!order) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.order.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Order deleted successfully';
  }
}
