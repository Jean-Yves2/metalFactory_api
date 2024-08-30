import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderService } from './supplier-order.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('SupplierOrderService', () => {
  let service: SupplierOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierOrderService, PrismaService],
    }).compile();

    service = module.get<SupplierOrderService>(SupplierOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
