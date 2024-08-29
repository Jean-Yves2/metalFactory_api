import { Test, TestingModule } from '@nestjs/testing';
import { FakerController } from './faker.controller';
import { FakerService } from './faker.service';
import { PrismaService } from '../../database/prisma/prisma.service';

describe('FakerController', () => {
  let controller: FakerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FakerController],
      providers: [FakerService, PrismaService],
    }).compile();

    controller = module.get<FakerController>(FakerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
