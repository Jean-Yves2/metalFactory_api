import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { stockMock } from './mocks/stock.mock';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
//import { HttpException, HttpStatus } from '@nestjs/common';

describe('StockService', () => {
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllStocks', () => {
    it('should return all stocks', async () => {
      expect(await service.getAllStocks()).toEqual(stockMock);
    });
  });
});
