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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddItemToCartDto } from './dto/addItemToCart.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Créer un nouveau panier pour l’utilisateur' })
  @ApiResponse({ status: 201, description: 'Panier créé avec succès.' })
  @ApiResponse({ status: 401, description: 'Non autorisé.' })
  createCart(@Body('userId') userId: number) {
    return this.cartService.createCart(userId);
  }

  @Post('item')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Ajouter un produit au panier de l’utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Produit ajouté au panier avec succès.',
  })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié.' })
  async addItemToCart(
    @Req() req: Request,
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
  @ApiOperation({ summary: 'Obtenir le panier de l’utilisateur' })
  @ApiResponse({ status: 200, description: 'Panier récupéré avec succès.' })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié.' })
  getCartByUserId(@Req() req: Request) {
    const userId = req.user?.sub;
    return this.cartService.getCartByUserId(userId);
  }

  @Delete('item')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Supprimer un produit du panier de l’utilisateur' })
  @ApiResponse({
    status: 200,
    description: 'Produit supprimé du panier avec succès.',
  })
  @ApiResponse({ status: 401, description: 'Utilisateur non authentifié.' })
  removeItemFromCart(
    @Req() req: Request,
    @Body() body: { productCode: number },
  ) {
    const userId = req.user?.sub;
    const { productCode } = body;
    return this.cartService.removeItemFromCart(userId, productCode);
  }
}
