import { Test, TestingModule } from '@nestjs/testing';
import { QuoteLineController } from './quote-line.controller';
import { QuoteLineService } from './quote-line.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('QuoteLineController', () => {
  let controller: QuoteLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteLineController],
      providers: [QuoteLineService, PrismaService],
    }).compile();

    controller = module.get<QuoteLineController>(QuoteLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
