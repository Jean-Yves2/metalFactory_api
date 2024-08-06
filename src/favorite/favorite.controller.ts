import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';

@Controller('favorites')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post()
  create(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoriteService.addToFavorites(createFavoriteDto);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: string) {
    return this.favoriteService.getFavorites(+userId);
  }

  @Patch(':userId/:productId')
  update(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
    @Body() updateFavoriteDto: UpdateFavoriteDto,
  ) {
    return this.favoriteService.updateFavorite(+userId, {
      ...updateFavoriteDto,
      productId: +productId,
    });
  }

  @Delete(':userId/:productId')
  remove(
    @Param('userId') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.favoriteService.softDelete(+userId, +productId);
  }
}
