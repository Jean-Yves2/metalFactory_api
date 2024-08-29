import { Test, TestingModule } from '@nestjs/testing';
import { WarehouseModule } from './warehouse.module';

describe('WarehouseModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [WarehouseModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
