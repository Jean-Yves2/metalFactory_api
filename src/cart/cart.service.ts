import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { AddItemToCartDto } from './dto/addItemToCart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(userId: number) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }

  async addItemToCart(userId: number, addItemToCartDto: AddItemToCartDto) {
    let cart = await this.prisma.cart.findUnique({ where: { userId } });
    if (!cart) {
      cart = await this.prisma.cart.create({ data: { userId } });
    }

    const cartItem = await this.prisma.cartItem.upsert({
      where: {
        cartId_productCode: {
          cartId: cart.id,
          productCode: addItemToCartDto.productCode,
        },
      },
      update: {
        quantity: {
          increment: addItemToCartDto.quantity,
        },
        length: addItemToCartDto.length,
      },
      create: {
        cartId: cart.id,
        productCode: addItemToCartDto.productCode,
        quantity: addItemToCartDto.quantity,
        length: addItemToCartDto.length,
      },
    });

    return cartItem;
  }

  async getCartByUserId(userId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    return cart;
  }

  async removeItemFromCart(userId: number, productCode: number) {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new Error('Cart not found');
    }

    return this.prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productCode,
      },
    });
  }
}
