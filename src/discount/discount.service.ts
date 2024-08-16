import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Discount } from '@prisma/client';

@Injectable()
export class DiscountService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDiscounts(): Promise<Discount[]> {
    try {
      return await this.prismaService.discount.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all discounts');
    }
  }

  async getDiscountById(id: number): Promise<Discount> {
    try {
      const discount = await this.prismaService.discount.findUnique({
        where: { id, deletedAt: null },
      });
      if (!discount) {
        throw new NotFoundException(`Discount with ID ${id} not found`);
      }
      return discount;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching discount with id ${id}`,
      );
    }
  }

  async createDiscount(
    createDiscountDto: CreateDiscountDto,
  ): Promise<Discount> {
    try {
      return await this.prismaService.discount.create({
        data: {
          ...createDiscountDto,
          createdAt: new Date(),
          quotes: { create: createDiscountDto.quotes },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating discount');
    }
  }

  async updateDiscount(
    id: number,
    updateDiscountDto: UpdateDiscountDto,
  ): Promise<Discount> {
    try {
      const discount = await this.prismaService.discount.findUnique({
        where: { id, deletedAt: null },
      });
      if (!discount) {
        throw new NotFoundException(`Discount with ID ${id} not found`);
      }
      return await this.prismaService.discount.update({
        where: { id },
        data: {
          ...updateDiscountDto,
          updatedAt: new Date(),
          quotes: {
            updateMany: {
              where: { discountId: id },
              data: updateDiscountDto.quotes,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating discount with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<Discount> {
    try {
      const discount = await this.prismaService.discount.findUnique({
        where: { id, deletedAt: null },
      });
      if (!discount) {
        throw new NotFoundException(`Discount with ID ${id} not found`);
      }
      return await this.prismaService.discount.update({
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
        `Error deleting discount with id ${id}`,
      );
    }
  }
}
