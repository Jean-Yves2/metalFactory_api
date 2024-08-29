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

  describe('createWarehouse', () => {
    it('should create a warehouse', async () => {
      const newWarehouse = {
        name: 'Nom du fsfsdfghgoujhkhrnjkljlkisseur',
        addressId: 15,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      };
      expect(await controller.create(newWarehouse)).toEqual(
        'Warehouse created successfully',
      );
    });
  });

  describe('updateWarehouse', () => {
    it('should update a warehouse', async () => {
      const dataForUpdateWarehouse = {
        name: 'New Name of the Warehouse',
        addressId: 57,
      };
      expect(await controller.update(3, dataForUpdateWarehouse)).toEqual({
        id: 3,
        name: 'New Name of the Warehouse',
        addressId: 57,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('deleteWarehouse', () => {
    it('should delete a Warehouse', async () => {
      expect(await controller.remove(3)).toEqual({
        id: 3,
        name: 'Quitzon, Medhurst and Mann',
        addressId: 57,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      }); // We don't return anything when we delete a supplier
    });
  });
});
