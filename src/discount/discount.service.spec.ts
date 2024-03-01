import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscountService, PrismaService],
    }).compile();

    service = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
