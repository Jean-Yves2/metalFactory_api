import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Warehouse } from '@prisma/client';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.prismaService.warehouse.findMany();
  }

  async getWarehouseById(id: number): Promise<Warehouse> {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return warehouse;
  }

  async createWarehouse(
    createWarehouseDto: CreateWarehouseDto,
  ): Promise<Warehouse> {
    return this.prismaService.warehouse.create({
      data: {
        ...createWarehouseDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async updateWarehouse(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return this.prismaService.warehouse.update({
      where: { id },
      data: {
        ...updateWarehouseDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Warehouse> {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id, deletedAt: null },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found`);
    }
    return this.prismaService.warehouse.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
