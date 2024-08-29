import { Test, TestingModule } from '@nestjs/testing';
import { SupplierModule } from './supplier.module';

describe('SupplierModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [SupplierModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
