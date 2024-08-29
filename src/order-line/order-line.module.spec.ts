import { Test, TestingModule } from '@nestjs/testing';
import { OrderLineModule } from './order-line.module';

describe('OrderLineModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OrderLineModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
