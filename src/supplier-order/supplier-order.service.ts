import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { SupplierOrder } from '@prisma/client';
import { CreateSupplierOrderDto } from './dto/create-supplier-order.dto';
import { UpdateSupplierOrderDto } from './dto/update-supplier-order.dto';

@Injectable()
export class SupplierOrderService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllSupplierOrders(): Promise<SupplierOrder[]> {
    try {
      return await this.prismaService.supplierOrder.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all supplier orders',
      );
    }
  }

  async getSupplierOrderById(id: number): Promise<SupplierOrder> {
    try {
      const supplierOrder = await this.prismaService.supplierOrder.findUnique({
        where: { id, deletedAt: null },
      });
      if (!supplierOrder) {
        throw new NotFoundException(`Supplier order with ID ${id} not found`);
      }
      return supplierOrder;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching supplier order with id ${id}`,
      );
    }
  }

  async createSupplierOrder(
    createSupplierOrderDto: CreateSupplierOrderDto,
  ): Promise<SupplierOrder> {
    try {
      return await this.prismaService.supplierOrder.create({
        data: {
          ...createSupplierOrderDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating supplier order');
    }
  }

  async updateSupplierOrder(
    id: number,
    updateSupplierOrderDto: UpdateSupplierOrderDto,
  ): Promise<SupplierOrder> {
    try {
      const supplierOrder = await this.prismaService.supplierOrder.findUnique({
        where: { id, deletedAt: null },
      });
      if (!supplierOrder) {
        throw new NotFoundException(`Supplier order with ID ${id} not found`);
      }
      return await this.prismaService.supplierOrder.update({
        where: { id },
        data: {
          ...updateSupplierOrderDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating supplier order with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<SupplierOrder> {
    try {
      const supplierOrder = await this.prismaService.supplierOrder.findUnique({
        where: { id, deletedAt: null },
      });
      if (!supplierOrder) {
        throw new NotFoundException(`Supplier order with ID ${id} not found`);
      }
      return await this.prismaService.supplierOrder.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting supplier order with id ${id}`,
      );
    }
  }
}
