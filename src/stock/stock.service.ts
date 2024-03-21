/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { Stock } from '@prisma/client';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Injectable()
export class StockService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllStocks(): Promise<Stock[]> {
    return this.prismaService.stock.findMany();
  }

  async getStockById(id: number): Promise<Stock> {
    const stock = await this.prismaService.stock.findUnique({
      where: { id },
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async createStock(createStockDto: CreateStockDto): Promise<Stock> {
    return this.prismaService.stock.create({
      data: {
        ...createStockDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async updateStock(
    id: number,
    updateStockDto: UpdateStockDto,
  ): Promise<Stock> {
    const stock = await this.prismaService.stock.findUnique({
      where: { id },
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.prismaService.stock.update({
      where: { id },
      data: {
        ...updateStockDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Stock> {
    const stock = await this.prismaService.stock.findUnique({
      where: { id, deletedAt: null },
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return this.prismaService.stock.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
