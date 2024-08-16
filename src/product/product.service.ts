import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async getProductsByRange(min: number, max: number): Promise<Product[]> {
    return this.prismaService.product.findMany({
      where: {
        productCode: {
          gte: min,
          lte: max,
        },
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async createProduct(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: createProductDto,
    });
  }

  async createManyProducts(createProductDto: CreateProductDto[]) {
    return this.prismaService.product.createMany({
      data: createProductDto,
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.product.update({
      where: { id: id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        basePrice: updateProductDto.basePrice,
        unitPriceExclTax: updateProductDto.unitPriceExclTax,
        VATRate: updateProductDto.VATRate,
        marginPercent: updateProductDto.marginPercent,
        linearWeight: updateProductDto.linearWeight,
        sellingPrice: updateProductDto.sellingPrice,
        updatedAt: new Date(),
      },
    });
    return 'Product updated successfully';
  }

  async softDelete(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.product.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Product deleted successfully';
  }
}
