import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('QuoteController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [QuoteService, PrismaService],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
