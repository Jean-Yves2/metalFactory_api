import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyService } from './delivery-company.service';

describe('DeliveryCompanyService', () => {
  let service: DeliveryCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeliveryCompanyService],
    }).compile();

    service = module.get<DeliveryCompanyService>(DeliveryCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
