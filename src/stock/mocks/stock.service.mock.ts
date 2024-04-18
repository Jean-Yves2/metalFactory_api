export class StockServiceMock {
  getAllStocks = jest.fn();
  getStockById = jest.fn();
  createStock = jest.fn();
  updateStock = jest.fn();
}
