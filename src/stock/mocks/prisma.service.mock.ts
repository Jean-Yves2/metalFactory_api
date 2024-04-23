import { stockMock } from './stock.mock';
import { CreateStockDto } from '../dto/create-stock.dto';
export class PrismaServiceMock {
  stock = {
    findMany: jest.fn().mockImplementation(() => {
      return stockMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const stock = stockMock.find((stock) => stock.id === params.where.id);
      return stock;
    }),
    create: jest.fn().mockImplementation((createStockDto: CreateStockDto) => {
      const newStock = {
        id: stockMock.length + 1,
        warehouseId: createStockDto.warehouseId,
        productId: createStockDto.productId,
        quantity: createStockDto.quantity,
        minThreshold: createStockDto.minThreshold,
        lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };
      stockMock.push(newStock);
      return 'Stock created successfully';
    }),

    update: jest.fn().mockImplementation((params) => {
      const stock = stockMock.find(
        (stock) => stock.id === params.where.id && stock.deletedAt === null,
      );

      stock.warehouseId = params.data.warehouseId;
      stock.productId = params.data.productId;
      stock.quantity = params.data.quantity;
      stock.minThreshold = params.data.minThreshold;
      stock.lastUpdated = new Date('2024-04-18T09:05:38.780Z');
      stock.createdAt = new Date('2024-04-18T09:05:38.780Z');
      stock.updatedAt = new Date('2024-04-18T09:05:38.780Z');
      stock.deletedAt = null;

      return 'Stock updated successfully';
    }),
  };
}
