import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { deliveryMock } from './mocks/delivery.mock';
import { InternalServerErrorException } from '@nestjs/common';

describe('DeliveryService', () => {
  let service: DeliveryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<DeliveryService>(DeliveryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllDeliveries', () => {
    it('should return all deliveries', async () => {
      expect(await service.getAllDeliveries()).toEqual(
        deliveryMock.filter((delivery) => delivery.id === 1),
      );
    });
    it('the fetch fails with an error', async () => {
      try {
        await service.getAllDeliveries();
      } catch (error) {
        expect(error).toEqual(
          new InternalServerErrorException('Error getting all deliveries'),
        );
      }
    });
  });
});
