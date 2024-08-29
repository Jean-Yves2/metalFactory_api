import { Injectable } from '@nestjs/common';
import { Favorite, Product } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: number, productCode: number): Promise<Favorite> {
    const numericProductCode = Number(productCode);

    if (isNaN(numericProductCode)) {
      throw new Error('Invalid product code');
    }

    return this.prisma.favorite.create({
      data: {
        userId,
        productCode: numericProductCode,
      },
    });
  }

  async removeFavorite(userId: number, productCode: number): Promise<Favorite> {
    const numericProductCode = Number(productCode);

    if (isNaN(numericProductCode)) {
      throw new Error('Invalid product code');
    }
    return this.prisma.favorite.delete({
      where: {
        userId_productCode: {
          userId,
          productCode: numericProductCode,
        },
      },
    });
  }

  async getFavorites(userId: number): Promise<Product[]> {
    const favorites = await this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        product: true,
      },
    });

    return favorites.map((favorite) => favorite.product);
  }
}
