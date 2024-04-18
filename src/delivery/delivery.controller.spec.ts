import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryServiceMock } from './mocks/delivery.service.mock';

describe('DeliveryController', () => {
  let controller: DeliveryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryController],
      providers: [
        { provide: DeliveryService, useClass: DeliveryServiceMock },
        PrismaService,
      ],
    }).compile();

    controller = module.get<DeliveryController>(DeliveryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
