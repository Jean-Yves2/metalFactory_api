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

  describe('createWarehouse', () => {
    it('should create a warehouse', async () => {
      const createWarehouse = {
        id: 1,
        name: 'Pagac, Predovic and Sanford',
        addressId: 73,
        createdAt: new Date('2024-03-19T11:32:13.557Z'),
        updatedAt: new Date('2024-03-19T11:32:13.557Z'),
        deletedAt: null,
      };
      expect(await service.createWarehouse(createWarehouse)).toEqual(
        'Warehouse created successfully',
      );
    });
  });

  describe('updateWarehouse', () => {
    it('should update a warehouse', async () => {
      const warehouseId = 3;
      const updatedWarehouse = {
        id: 1,
        name: 'Pagac, Predovic and Sanford',
        addressId: 73,
        createdAt: new Date('2024-03-19T11:32:13.557Z'),
        updatedAt: new Date('2024-03-19T11:32:13.557Z'),
        deletedAt: null,
      };
      expect(
        await service.updateWarehouse(warehouseId, updatedWarehouse),
      ).toEqual('Warehouse updated successfully');
    });

    it('should return null when supplier is not found', async () => {
      const warehouseId = 100;
      const updatedWarehouse = {
        id: 1,
        name: 'Pagac, Predovic and Sanford',
        addressId: 73,
        createdAt: new Date('2024-03-19T11:32:13.557Z'),
        updatedAt: new Date('2024-03-19T11:32:13.557Z'),
        deletedAt: null,
      };
      await expect(
        service.updateWarehouse(warehouseId, updatedWarehouse),
      ).rejects.toThrow(
        new HttpException('Warehouse not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('softDelete', () => {
    it('should delete a warehouse', async () => {
      const warehouseId = 3;
      expect(await service.softDelete(warehouseId)).toEqual(
        'Warehouse deleted successfully',
      );
    });

    it('should return null when warehouse is not found', async () => {
      const warehouseId = 100;
      await expect(service.softDelete(warehouseId)).rejects.toThrow(
        new HttpException('Warehouse not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
