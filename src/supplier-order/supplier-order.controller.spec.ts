import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderController } from './supplier-order.controller';

describe('SupplierOrderController', () => {
  let controller: SupplierOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOrderController],
    }).compile();

    controller = module.get<SupplierOrderController>(SupplierOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
