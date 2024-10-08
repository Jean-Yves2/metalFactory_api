import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CartService } from './cart.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [ConfigService, JwtService, CartService, PrismaService],
    }).compile();

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
