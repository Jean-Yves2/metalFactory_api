import { Test, TestingModule } from '@nestjs/testing';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('CartItemController', () => {
  let controller: CartItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemController],
      providers: [CartItemService, PrismaService],
    }).compile();

    controller = module.get<CartItemController>(CartItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
