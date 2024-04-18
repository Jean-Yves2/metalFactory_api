import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryController } from './delivery.controller';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryServiceMock } from './mocks/delivery.service.mock';
import { deliveryMock } from './mocks/delivery.mock';
import { DeliveryStatus } from '@prisma/client';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { Decimal } from '@prisma/client/runtime/library';

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
        weight: new Decimal(77.77),
        cost: new Decimal(50),
        VATRate: new Decimal(92),
        deliveryStatus: DeliveryStatus.DELIVERED,
      };
      expect(await controller.create(newDelivery)).toEqual(
        'Delivery created successfully',
      );
    });
  });

  describe('updateDelivery', () => {
    it('should update a delivery', async () => {
      const dataForUpdateDelivery: CreateDeliveryDto = {
        orderId: 1,
        deliveryCompanyId: 1,
        distance: 999, // Test the update of the distance
        weight: new Decimal(77.77),
        cost: new Decimal(50),
        VATRate: new Decimal(92),
        deliveryStatus: DeliveryStatus.DELIVERED,
      };
      expect(await controller.update(1, dataForUpdateDelivery)).toEqual(
        'Delivery updated successfully',
      );
    });
  });

  describe('removeDelivery', () => {
    it('should delete a delivery', async () => {
      expect(await controller.remove(1)).toEqual(
        'Delivery deleted successfully',
      );
    });
  });
});
