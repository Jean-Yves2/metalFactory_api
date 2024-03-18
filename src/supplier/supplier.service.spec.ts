import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './supplier.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierService, PrismaService],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
