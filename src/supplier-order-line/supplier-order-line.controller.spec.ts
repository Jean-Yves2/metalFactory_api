import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderLineController } from './supplier-order-line.controller';

describe('SupplierOrderLineController', () => {
  let controller: SupplierOrderLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOrderLineController],
    }).compile();

    controller = module.get<SupplierOrderLineController>(SupplierOrderLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
