import { Test, TestingModule } from '@nestjs/testing';
import { CommercialController } from './commercial.controller';
import { PrismaService } from '../database/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CommercialService } from './commercial.service';
import { QuoteService } from '../quote/quote.service';

describe('CommercialController', () => {
  let controller: CommercialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService, JwtService, CommercialService, QuoteService],
      controllers: [CommercialController],
    }).compile();

    controller = module.get<CommercialController>(CommercialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
