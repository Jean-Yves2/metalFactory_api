import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyModule } from './delivery-company.module';

describe('DeliveryCompanyModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DeliveryCompanyModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
