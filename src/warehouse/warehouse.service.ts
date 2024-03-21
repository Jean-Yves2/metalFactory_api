import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from '@prisma/client';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Warehouse[]> {
    return this.prismaService.warehouse.findMany({
      where: { deletedAt: null },
    });
  }

  async findById(id: number): Promise<Warehouse> {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id, deletedAt: null },
    });
    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID ${id} not found.`);
    }
    return warehouse;
  }

  async create(createWarehouseDto: CreateWarehouseDto): Promise<Warehouse> {
    return this.prismaService.warehouse.create({
      data: {
        ...createWarehouseDto,
        createdAt: new Date(),
      },
    });
  }

  async update(
    id: number,
    updateWarehouseDto: UpdateWarehouseDto,
  ): Promise<Warehouse> {
    await this.findById(id); // Reuse to check if warehouse exists
    return this.prismaService.warehouse.update({
      where: { id },
      data: {
        ...updateWarehouseDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Warehouse> {
    await this.findById(id);
    return this.prismaService.warehouse.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
