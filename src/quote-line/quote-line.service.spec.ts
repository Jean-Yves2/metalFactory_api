import { Test, TestingModule } from '@nestjs/testing';
import { QuoteLineService } from './quote-line.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('QuoteLineService', () => {
  let service: QuoteLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteLineService, PrismaService],
    }).compile();

    service = module.get<QuoteLineService>(QuoteLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
