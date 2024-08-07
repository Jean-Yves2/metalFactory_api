import { Test, TestingModule } from '@nestjs/testing';
import { CartItemService } from './cart-item.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('CartItemService', () => {
  let service: CartItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartItemService, PrismaService],
    }).compile();

    service = module.get<CartItemService>(CartItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
