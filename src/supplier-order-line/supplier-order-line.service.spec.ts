import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderLineService } from './supplier-order-line.service';

describe('SupplierOrderLineService', () => {
  let service: SupplierOrderLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierOrderLineService],
    }).compile();

    service = module.get<SupplierOrderLineService>(SupplierOrderLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
