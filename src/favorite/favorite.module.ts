import { Module } from '@nestjs/common';
import { FavoritesService } from './favorite.service';
import { FavoritesController } from './favorite.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, JwtService],
  exports: [FavoritesService],
})
export class FavoriteModule {}
