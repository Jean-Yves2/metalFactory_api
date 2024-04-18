import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryServiceMock } from './mocks/delivery.service.mock';
import { deliveryMock } from './mocks/delivery.mock';
import { DeliveryStatus } from '@prisma/client';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

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

  describe('getAllDeliveries', () => {
    it('should return an array of deliveries', async () => {
      const result = await controller.findAll();
      expect(result).toEqual(deliveryMock);
    });
  });

  describe('getDeliveryById', () => {
    it('should return a delivery by id', async () => {
      const getDelivery = deliveryMock.find((delivery) => delivery.id === 1);
      expect(await controller.findOne(1)).toEqual(getDelivery);
    });
  });

  describe('createDelivery', () => {
    it('should create a delivery', async () => {
      const newDelivery: CreateDeliveryDto = {
        orderId: 1,
        deliveryCompanyId: 1,
        distance: 201,
        weight: 77.77,
        cost: 50,
        VATRate: 92,
        deliveryStatus: DeliveryStatus.DELIVERED,
      };
      expect(await controller.create(newDelivery)).toEqual(
        'Delivery created successfully',
      );
    });
  });
});
