import { Controller, Post, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FavoritesService } from './favorite.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Post(':productCode')
  async addFavorite(@Req() req: Request, @Param('productCode') productCode: number) {
    console.log('req.user:', req.user);
    const userId = req.user?.sub;
    return this.favoritesService.addFavorite(userId, productCode);
  }
  @UseGuards(AuthGuard)
  @Delete(':productCode')
  async removeFavorite(@Req() req: Request, @Param('productCode') productCode: number) {
    const userId = req.user?.sub;
    return this.favoritesService.removeFavorite(userId, productCode);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getFavorites(@Req() req: Request) {
    const userId = req.user['id'];
    return this.favoritesService.getFavorites(userId);
  }
}
