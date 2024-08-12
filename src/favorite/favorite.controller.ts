import { Controller, Post, Delete, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { FavoritesService } from './favorite.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  
  @UseGuards(AuthGuard)
  @Post()
  async addFavorite(@Req() req: Request, @Param('productCode') productCode: number) {
    const userId = req.user?.id;
    return this.favoritesService.addFavorite(userId, productCode);
  }
  @Delete()
  async removeFavorite(@Req() req: Request, @Param('productCode') productCode: number) {
    const userId = (req.user as any)['id'];
    return this.favoritesService.removeFavorite(userId, productCode);
  }

  @UseGuards(AuthGuard)
  @Get()
  async getFavorites(@Req() req: Request) {
    const userId = req.user['id'];
    return this.favoritesService.getFavorites(userId);
  }
}
