/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('StockController', () => {
  let controller: StockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [StockService, PrismaService],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
