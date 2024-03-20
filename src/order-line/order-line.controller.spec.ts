import { Test, TestingModule } from '@nestjs/testing';
import { OrderLineController } from './order-line.controller';
import { OrderLineService } from './order-line.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('OrderLineController', () => {
  let controller: OrderLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderLineController],
      providers: [OrderLineService, PrismaService],
    }).compile();

    controller = module.get<OrderLineController>(OrderLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
