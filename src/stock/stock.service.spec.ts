import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { stockMock } from './mocks/stock.mock';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

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

  describe('getStockById', () => {
    it('should return a stock by id', async () => {
      const getStock = stockMock.find((stock) => stock.id === 1);
      expect(await service.getStockById(1)).toEqual(getStock);
    });

    it('should throw HttpException when stock is not found', async () => {
      const nonExistingStockId = 100;
      const getUserPromise = service.getStockById(nonExistingStockId);
      await expect(getUserPromise).rejects.toThrow(
        new HttpException('Stock not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createStock', () => {
    it('should create a stock', async () => {
      const createStock = {
        id: 1,
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
        lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };
      expect(await service.createStock(createStock)).toEqual(
        'Stock created successfully',
      );
    });
  });

  describe('updateStock', () => {
    it('should update a stock', async () => {
      const stockId = 1;
      const updatedStock = {
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
        lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };
      expect(await service.updateStock(stockId, updatedStock)).toEqual(
        'Stock updated successfully',
      );
    });

    it('should return null when stock is not found', async () => {
      const stockId = 100;
      const updatedStock = {
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
        lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };
      await expect(service.updateStock(stockId, updatedStock)).rejects.toThrow(
        new HttpException('Stock not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('softDelete', () => {
    it('should delete a stock', async () => {
      const stockId = 1;
      expect(await service.softDelete(stockId)).toEqual(
        'Stock deleted successfully',
      );
    });
    it('should return null when stock is not found', async () => {
      const stockId = 100;
      await expect(service.softDelete(stockId)).rejects.toThrow(
        new HttpException('Stock not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
