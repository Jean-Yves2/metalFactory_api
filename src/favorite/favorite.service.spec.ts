import { Test, TestingModule } from '@nestjs/testing';
import { FavoritesService } from './favorite.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('FavoriteService', () => {
  let service: FavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavoritesService, PrismaService],
    }).compile();

    service = module.get<FavoritesService>(FavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
