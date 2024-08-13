import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { RemoveItemFromCartDto } from './dto/removeItemFromCart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  createCart(@Body('userId') userId: number) {
    return this.cartService.createCart(userId);
  }

  @Post('item')
  addItemToCart(@Body() addItemToCartDto: AddItemToCartDto) {
    return this.cartService.addItemToCart( addItemToCartDto
        
    );
  }

  @Get(':userId')
  getCartByUserId(@Param('userId') userId: number) {
    return this.cartService.getCartByUserId(userId);
  }

  @Delete('item')
  removeItemFromCart(@Body() removeItemFromCartDto: RemoveItemFromCartDto) {
  
    return this.cartService.removeItemFromCart(removeItemFromCartDto);
  }
}
