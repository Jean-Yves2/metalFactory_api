import { Test, TestingModule } from '@nestjs/testing';
import { StockModule } from './stock.module';

describe('StockModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [StockModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
