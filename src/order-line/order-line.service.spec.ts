import { Test, TestingModule } from '@nestjs/testing';
import { OrderLineService } from './order-line.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('OrderLineService', () => {
  let service: OrderLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderLineService, PrismaService],
    }).compile();

    service = module.get<OrderLineService>(OrderLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
