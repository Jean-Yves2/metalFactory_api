import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service'; // Assurez-vous d'avoir un PrismaService qui gère les interactions avec Prisma
import { Prisma } from '@prisma/client';
import { RemoveItemFromCartDto } from './dto/removeItemFromCart.dto';
import { AddItemToCartDto } from './dto/addItemToCart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async createCart(userId: number) {
    return this.prisma.cart.create({
      data: { userId },
    });
  }

  async addItemToCart(addItemToCartDto: AddItemToCartDto) {
    const { cartId, productCode, quantity, length } = addItemToCartDto;
    return this.prisma.cartItem.upsert({
      where: { cartId_productCode: { cartId, productCode } },
      update: { quantity, length },
      create: { cartId, productCode, quantity, length },
    });
  }

async getCartByUserId(userId: number) {
    return this.prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
    });
}

async removeItemFromCart(removeItemFromCartDto: RemoveItemFromCartDto) {
    const { cartId, productCode } = removeItemFromCartDto;
    return this.prisma.cartItem.delete({
        where: { cartId_productCode: { cartId, productCode } },
    });
}
}
