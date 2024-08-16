import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post()
  createCart(@Body('userId') userId: number) {
    return this.cartService.createCart(userId);
  }

  @Post('item')
  @UseGuards(AuthGuard)
  async addItemToCart(
    @Req() req: any,
    @Body() addItemToCartDto: AddItemToCartDto,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.cartService.addItemToCart(userId, addItemToCartDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getCartByUserId(@Req() req: Request) {
    const userId = req.user?.sub;
    console.log('userId', userId);
    return this.cartService.getCartByUserId(userId);
  }

  @UseGuards(AuthGuard)
  @Delete('item')
  removeItemFromCart(
    @Req() req: Request,
    @Body() body: { productCode: number },
  ) {
    const userId = req.user?.sub;
    const { productCode } = body;
    return this.cartService.removeItemFromCart(userId, productCode);
  }
}
