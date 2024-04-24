import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseService } from './warehouse.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { warehouseMock } from './mocks/warehouse.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('WarehouseService', () => {
  let service: WarehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarehouseService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<WarehouseService>(WarehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllWarehouse', () => {
    it('should return all warehouses', async () => {
      expect(await service.getAllWarehouses()).toEqual(warehouseMock);
    });
  });

  describe('getWarehouseById', () => {
    it('should return a warehouse by id', async () => {
      const getWarehouse = warehouseMock.find(
        (warehouse) => warehouse.id === 1,
      );
      expect(await service.getWarehouseById(1)).toEqual(getWarehouse);
    });

    it('should throw HttpException when warehouse is not found', async () => {
      const nonExistingWarehouseId = 100;
      const getUserPromise = service.getWarehouseById(nonExistingWarehouseId);
      await expect(getUserPromise).rejects.toThrow(
        new HttpException('Warehouse not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
