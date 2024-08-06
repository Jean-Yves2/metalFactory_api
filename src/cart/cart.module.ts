import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { CartItemModule } from '../cart-item/cart-item.module';

@Module({
  imports: [CartItemModule],
  controllers: [CartController],
  providers: [CartService, PrismaService],
  exports: [CartService],
})
export class CartModule {}
