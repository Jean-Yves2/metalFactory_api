import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async getProductById(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prismaService.product.update({
      where: { id },
      data: {
        ...updateProductDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id, deletedAt: null },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.prismaService.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
