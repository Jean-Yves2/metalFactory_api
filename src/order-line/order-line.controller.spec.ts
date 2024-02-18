import { Test, TestingModule } from '@nestjs/testing';
import { OrderLineController } from './order-line.controller';

describe('OrderLineController', () => {
  let controller: OrderLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderLineController],
    }).compile();

    controller = module.get<OrderLineController>(OrderLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
