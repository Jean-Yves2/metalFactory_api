import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { StockServiceMock } from './mocks/stock.service.mock';
import { stockMock } from './mocks/stock.mock';

describe('StockController', () => {
  let controller: StockController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        { provide: StockService, useClass: StockServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllStocks', () => {
    it('Should return all stock', async () => {
      const getAllStocks = [stockMock.find((stock) => stock.id === 1)];
      expect(await controller.findAll()).toEqual(getAllStocks);
    });
  });

  describe('getStockById', () => {
    it('Should return a stock by id', async () => {
      const getStock = stockMock.find((stock) => stock.id === 1);
      expect(await controller.findOne(1)).toEqual(getStock);
    });
  });

  describe('createStock', () => {
    it('should create a stock', async () => {
      const newStock = {
        warehouseId: 1,
        productId: 1,
        quantity: 999,
        minThreshold: 10,
      };
      expect(await controller.create(newStock)).toEqual(
        'Stock created successfully',
      );
    });
  });

  describe('updateStock', () => {
    it('should update a Stock', async () => {
      const dataForUpdateStock = {
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
      };
      expect(await controller.update(1, dataForUpdateStock)).toEqual({
        id: 1,
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
        lastUpdated: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('deleteStock', () => {
    it('should delete a Stock', async () => {
      expect(await controller.remove(1)).toEqual({
        id: 1,
        warehouseId: 1,
        productId: 1,
        quantity: 100,
        minThreshold: 10,
        lastUpdated: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      }); // We don't return anything when we delete a Stock
    });
  });
});
