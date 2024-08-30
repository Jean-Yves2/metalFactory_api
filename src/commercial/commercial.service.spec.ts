import { Test, TestingModule } from '@nestjs/testing';
import { CommercialService } from './commercial.service';
import { PrismaService } from '../database/prisma/prisma.service';

describe('CommercialService', () => {
  let service: CommercialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommercialService, PrismaService],
    }).compile();

    service = module.get<CommercialService>(CommercialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
