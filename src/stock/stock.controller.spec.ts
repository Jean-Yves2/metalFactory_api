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
      expect(await controller.findAll()).toEqual(stockMock);
    });
  });
});
