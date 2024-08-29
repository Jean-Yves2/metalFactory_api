import { Test, TestingModule } from '@nestjs/testing';
import { OrderModule } from './order.module';

describe('OrderModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
