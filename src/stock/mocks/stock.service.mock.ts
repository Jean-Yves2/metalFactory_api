import { stockMock } from './stock.mock';
import { CreateStockDto } from '../dto/create-stock.dto';
export class StockServiceMock {
  getAllStocks = jest.fn().mockImplementation(() => {
    const activeStock = stockMock.filter((stock) => stock.deletedAt === null);
    console.log('activeStock : ', activeStock);
    return activeStock;
  });
  getStockById = jest.fn().mockImplementation((id: number) => {
    return stockMock.find((stock) => stock.id === id);
  });
  createStock = jest
    .fn()
    .mockImplementation((createStockDto: CreateStockDto) => {
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
    });

  updateStock = jest
    .fn()
    .mockImplementation((id: number, createStockDto: CreateStockDto) => {
      const Stock = stockMock.find((Stock) => Stock.id === id);
      const updateStock = {
        ...Stock,
        warehouseId: createStockDto.warehouseId,
        productId: createStockDto.productId,
        quantity: createStockDto.quantity,
        minThreshold: createStockDto.minThreshold,
        lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };
      return updateStock;
    });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const stock = stockMock.find((stock) => stock.id === id);
    const deleteStock = {
      ...stock,
      deletedAt: new Date(),
    };
    return deleteStock;
  });
}
