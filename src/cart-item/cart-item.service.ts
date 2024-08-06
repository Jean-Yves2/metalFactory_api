import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createCartItem(createCartItemDto: CreateCartItemDto) {
    const { cartId, productId, quantity } = createCartItemDto;
    try {
      return this.prisma.cartItem.create({
        data: { cartId, productId, quantity },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating cart item');
    }
  }

  async updateCartItem(itemId: number, updateCartItemDto: UpdateCartItemDto) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem || cartItem.deletedAt) {
      throw new NotFoundException('Item not found in cart');
    }

    try {
      return this.prisma.cartItem.update({
        where: { id: itemId },
        data: updateCartItemDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error updating cart item');
    }
  }

  async softDelete(itemId: number) {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
    });

    if (!cartItem || cartItem.deletedAt) {
      throw new NotFoundException('Item not found in cart');
    }

    try {
      return this.prisma.cartItem.update({
        where: { id: itemId },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error removing cart item');
    }
  }
}
