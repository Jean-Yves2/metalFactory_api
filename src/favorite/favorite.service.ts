import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { Favorite } from '@prisma/client';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async addToFavorites(
    createFavoriteDto: CreateFavoriteDto,
  ): Promise<Favorite> {
    try {
      return await this.prisma.favorite.create({
        data: createFavoriteDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error adding to favorites');
    }
  }

  async getFavorites(userId: number): Promise<Favorite[]> {
    try {
      return await this.prisma.favorite.findMany({
        where: {
          userId,
          deletedAt: null,
        },
        include: { product: true },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting favorites');
    }
  }

  async updateFavorite(
    userId: number,
    updateFavoriteDto: UpdateFavoriteDto,
  ): Promise<Favorite> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: updateFavoriteDto.productId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException(`Favorite not found`);
    }

    try {
      return await this.prisma.favorite.update({
        where: {
          userId_productId: {
            userId,
            productId: updateFavoriteDto.productId,
          },
        },
        data: updateFavoriteDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating favorite');
    }
  }

  async softDelete(userId: number, productId: number): Promise<Favorite> {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
    if (!favorite) {
      throw new NotFoundException(`Favorite not found`);
    }

    try {
      return await this.prisma.favorite.update({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error removing from favorites');
    }
  }
}
