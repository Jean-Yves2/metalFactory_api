import { Test, TestingModule } from '@nestjs/testing';
import { FakerService } from './faker.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('FakerService', () => {
  let service: FakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakerService, PrismaService],
    }).compile();

    service = module.get<FakerService>(FakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
