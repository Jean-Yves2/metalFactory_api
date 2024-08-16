import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Warehouse } from '@prisma/client';
import {} from '@nestjs/common';

@Injectable()
export class WarehouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllWarehouses(): Promise<Warehouse[]> {
    return this.prismaService.warehouse.findMany();
  }

  async getWarehouseById(id: number) {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!warehouse) {
      throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
    }

    return warehouse;
  }

  async createWarehouse(createWarehouseDto: CreateWarehouseDto) {
    await this.prismaService.warehouse.create({
      data: {
        ...createWarehouseDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return 'Warehouse created successfully';
  }

  async updateWarehouse(id: number, updateWarehouseDto: UpdateWarehouseDto) {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!warehouse) {
      throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.warehouse.update({
      where: { id: id },
      data: {
        ...updateWarehouseDto,
        updatedAt: new Date(),
      },
    });
    return 'Warehouse updated successfully';
  }

  async softDelete(id: number) {
    const warehouse = await this.prismaService.warehouse.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!warehouse) {
      throw new HttpException('Warehouse not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.warehouse.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Warehouse deleted successfully';
  }
}
