import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from '@prisma/client';
import { UpdateProductDto } from './dto/update-product.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany();
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
    try {
      const newProduct = await this.prismaService.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description,
          basePrice: new Decimal(createProductDto.basePrice),
          unitPriceExclTax: new Decimal(createProductDto.unitPriceExclTax),
          VATRate: new Decimal(createProductDto.VATRate),
          marginPercent: new Decimal(createProductDto.marginPercent),
          sellingPrice: new Decimal(createProductDto.sellingPrice),
          linearWeight: createProductDto.linearWeight ? new Decimal(createProductDto.linearWeight) : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
      return 'Product created successfully';
    } catch (error) {
      throw new Error(`Failed to create product: ${error}`);
    }
  }
 
  async createManyProducts(products: CreateProductDto[]) {
    const productInputs = products.map(product => ({
      name: product.name,
      description: product.description,
      basePrice: new Decimal(product.basePrice),
      unitPriceExclTax: new Decimal(product.unitPriceExclTax),
      VATRate: new Decimal(product.VATRate),
      marginPercent: new Decimal(product.marginPercent),
      sellingPrice: new Decimal(product.sellingPrice),
      linearWeight: product.linearWeight ? new Decimal(product.linearWeight) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return this.prismaService.product.createMany({
      data: productInputs,
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
