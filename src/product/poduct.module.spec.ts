import { Test, TestingModule } from '@nestjs/testing';
import { ProductModule } from './product.module';

describe('ProductModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
