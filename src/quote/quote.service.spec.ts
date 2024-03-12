import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService, PrismaService],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
