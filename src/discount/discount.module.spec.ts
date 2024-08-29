import { Test, TestingModule } from '@nestjs/testing';
import { DiscountModule } from './discount.module';

describe('DiscountModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DiscountModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
