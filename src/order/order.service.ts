import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrders(): Promise<Order[]> {
    try {
      return await this.prismaService.order.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all orders');
    }
  }

  async getOrderById(id: number): Promise<Order> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id, deletedAt: null },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching order with id ${id}`,
      );
    }
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      return await this.prismaService.order.create({
        data: {
          ...createOrderDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating order');
    }
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id, deletedAt: null },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return await this.prismaService.order.update({
        where: { id },
        data: {
          ...updateOrderDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating order with id ${id}`,
      );
    }
  }

  async deleteOrder(id: number): Promise<Order> {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id, deletedAt: null },
      });
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      return await this.prismaService.order.update({
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
        `Error deleting order with id ${id}`,
      );
    }
  }
}
