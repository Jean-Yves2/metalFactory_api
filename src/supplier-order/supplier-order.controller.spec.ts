import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderController } from './supplier-order.controller';
import { SupplierOrderService } from './supplier-order.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('SupplierOrderController', () => {
  let controller: SupplierOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOrderController],
      providers: [SupplierOrderService, PrismaService],
    }).compile();

    controller = module.get<SupplierOrderController>(SupplierOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
