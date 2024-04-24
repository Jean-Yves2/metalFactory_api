import { CreateWarehouseDto } from '../dto/create-warehouse.dto';
import { warehouseMock } from './warehouse.mock';
export class WarehouseServiceMock {
  // this is a mock class that will be used to replace the real WarehouseService class
  // In code this.warehouseService.getAllWarehouses() will be replaced with this.getAllWarehouses() in my mock class
  getAllWarehouses = jest.fn().mockImplementation(() => {
    return warehouseMock;
  });

  getWarehouseById = jest.fn().mockImplementation((id: number) => {
    return warehouseMock.find((warehouse) => warehouse.id === id);
  });

  createWarehouse = jest
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
    });

  updateWarehouse = jest
    .fn()
    .mockImplementation(
      (id: number, createWarehouseDto: CreateWarehouseDto) => {
        const warehouse = warehouseMock.find(
          (warehouse) => warehouse.id === id,
        );
        const updateWarehouse = {
          ...warehouse,
          name: createWarehouseDto.name,
          updatedAt: new Date(),
        };
        return updateWarehouse;
      },
    );

  softeDeleteWarehouse = jest.fn().mockImplementation((id: number) => {
    const warehouse = warehouseMock.find((warehouse) => warehouse.id === id);
    const deleteWarehouse = {
      ...warehouse,
      deletedAt: new Date(),
    };
    return deleteWarehouse;
  });
}
