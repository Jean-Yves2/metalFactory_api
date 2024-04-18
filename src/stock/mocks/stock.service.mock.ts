import { stockMock } from './stock.mock';
export class StockServiceMock {
  getAllStocks = jest.fn().mockImplementation(() => {
    return stockMock;
  });
  getStockById = jest.fn();
  createStock = jest.fn();
  updateStock = jest.fn();
}
