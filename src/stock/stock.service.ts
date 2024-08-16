import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getStockById(id: number) {
    const stock = await this.prismaService.stock.findUnique({
      where: { id },
    });
    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }
    return stock;
  }

  async createStock(createStockDto: CreateStockDto) {
    await this.prismaService.stock.create({
      data: {
        ...createStockDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return 'Stock created successfully';
  }

  async updateStock(id: number, updateStockDto: UpdateStockDto) {
    const stock = await this.prismaService.stock.findUnique({
      where: { id: id, deletedAt: null },
    });
    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.stock.update({
      where: { id: id },
      data: {
        ...updateStockDto,
        updatedAt: new Date(),
      },
    });
    return 'Stock updated successfully';
  }

  async softDelete(id: number) {
    const stock = await this.prismaService.stock.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!stock) {
      throw new HttpException('Stock not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.stock.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Stock deleted successfully';
  }
}
