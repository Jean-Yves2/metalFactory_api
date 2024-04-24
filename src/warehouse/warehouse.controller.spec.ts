import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
//import { PrismaService } from '../database/prisma/prisma.service';
import { WarehouseServiceMock } from './mocks/warehouse.service.mock';
import { warehouseMock } from './mocks/warehouse.mock';
describe('WarehouseController', () => {
  let controller: WarehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarehouseController],
      providers: [
        { provide: WarehouseService, useClass: WarehouseServiceMock },
      ],
    }).compile();

    controller = module.get<WarehouseController>(WarehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllWarehouses', () => {
    it('should return all warehouses', async () => {
      expect(await controller.findAll()).toEqual(warehouseMock);
    });
  });

  describe('getWarehouserById', () => {
    it('should return a warehouse by id', async () => {
      const getWarehouse = warehouseMock.find(
        (warehouse) => warehouse.id === 1,
      );
      expect(await controller.findOne(1)).toEqual(getWarehouse);
    });
  });
});
