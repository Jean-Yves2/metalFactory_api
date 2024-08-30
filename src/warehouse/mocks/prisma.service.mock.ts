import { warehouseMock } from './warehouse.mock';
import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
export class PrismaServiceMock {
  warehouse = {
    findMany: jest.fn().mockImplementation(() => {
      return warehouseMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const warehouse = warehouseMock.find(
        (warehouse) => warehouse.id === params.where.id,
      );
      return warehouse;
    }),
    create: jest
      .fn()
      .mockImplementation((createWarehouseDto: CreateWarehouseDto) => {
        const newWarehouse = {
          id: warehouseMock.length + 1,
          name: createWarehouseDto.name,
          addressId: 10, // this is a mock value
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        warehouseMock.push(newWarehouse);
        return 'Warehouse created successfully';
      }),

    update: jest.fn().mockImplementation((params) => {
      const warehouse = warehouseMock.find(
        (warehouse) =>
          warehouse.id === params.where.id && warehouse.deletedAt === null,
      );

      warehouse.name = params.data.name;
      warehouse.updatedAt = new Date();

      return 'Warehouse updated successfully';
    }),
  };
}
