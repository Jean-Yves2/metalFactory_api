import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.createCart(createCartDto);
  }

  @Patch(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.updateCart(+userId, updateCartDto);
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.cartService.getCart(+userId);
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.cartService.softDelete(+userId);
  }
}
