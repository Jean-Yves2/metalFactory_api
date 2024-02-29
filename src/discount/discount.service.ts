import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Discount } from '@prisma/client';

@Injectable()
export class DiscountService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDiscounts(): Promise<Discount[]> {
    return this.prismaService.discount.findMany({
      where: { deletedAt: null },
    });
  }

  async getDiscountById(id: number): Promise<Discount> {
    const discount = await this.prismaService.discount.findUnique({
      where: { id, deletedAt: null },
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async createDiscount(
    createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    return this.prismaService.discount.create({
      data: {
        ...createDiscountDto,
        createdAt: new Date(),
        quotes: { create: createDiscountDto.quotes }, // Add this line to fix the type error
      },
    });
  }

  async updateDiscount(
    id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    const discount = await this.prismaService.discount.findUnique({
      where: { id, deletedAt: null },
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return this.prismaService.discount.update({
      where: { id },
      data: {
        ...updateDiscountDto,
        updatedAt: new Date(),
        quotes: {
          updateMany: {
            where: { discountId: id },
            data: updateDiscountDto.quotes,
          },
        }, // Update the quotes property to use the 'updateMany' operation with the missing 'where' and 'data' properties
      },
    });
  }

  async softDelete(id: number): Promise<Discount> {
    const discount = await this.prismaService.discount.findUnique({
      where: { id, deletedAt: null },
    });
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return this.prismaService.discount.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
