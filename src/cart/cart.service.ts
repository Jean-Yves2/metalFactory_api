import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(userId: number) {
    try {
      return this.prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            where: { deletedAt: null },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting cart');
    }
  }

  async createCart(createCartDto: CreateCartDto) {
    try {
      return this.prisma.cart.create({
        data: createCartDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating cart');
    }
  }

  async updateCart(userId: number, updateCartDto: UpdateCartDto) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    try {
      return this.prisma.cart.update({
        where: { userId },
        data: updateCartDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating cart');
    }
  }

  async softDelete(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    try {
      return this.prisma.cart.update({
        where: { userId },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error removing cart');
    }
  }
}
