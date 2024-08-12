import { Injectable } from '@nestjs/common';
import { Favorite, Product } from '@prisma/client';
import { PrismaService } from '../database/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async addFavorite(userId: number, productCode: number): Promise<Favorite> {
    return this.prisma.favorite.create({
      data: {
        userId,
        productCode,
      },
    });
  }

  async removeFavorite(userId: number, productCode: number): Promise<Favorite> {
    return this.prisma.favorite.delete({
      where: {
        userId_productCode: {
          userId,
          productCode,
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
    
    return favorites.map(favorite => favorite.product);
  }
}
