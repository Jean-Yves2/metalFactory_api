import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesController } from './favorite.controller';
import { FavoritesService } from './favorite.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

describe('FavoriteController', () => {
  let controller: FavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavoritesController],
      providers: [FavoritesService, PrismaService, JwtService, ConfigService],
    }).compile();

    controller = module.get<FavoritesController>(FavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
