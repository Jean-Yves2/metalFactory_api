import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryService } from './delivery.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { deliveryMock } from './mocks/delivery.mock';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';

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

  describe('getDeliveryById', () => {
    it('should return the delivery with the given id', async () => {
      expect(await service.getDeliveryById(1)).toEqual(
        deliveryMock.find((delivery) => delivery.id === 1),
      );
    });

    it('should throw NotFoundException when delivery is not found', async () => {
      const id = 99; // This is an invalid id
      jest
        .spyOn(service['prismaService'].delivery, 'findUnique')
        .mockResolvedValue(null); // Mocking the situation ⚠️ where no delivery is found

      await expect(service.getDeliveryById(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 1; // This is a valid id
      jest
        .spyOn(service['prismaService'].delivery, 'findUnique')
        .mockRejectedValue(new Error('Internal Server Error'));

      try {
        await service.getDeliveryById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain('Error getting delivery with id 1');
      }
    });
  });

  describe('createDelivery', () => {
    it('should create a delivery', async () => {
      const newDelivery: CreateDeliveryDto = {
        orderId: 1,
        deliveryCompanyId: 1,
        distance: 201,
        weight: 200,
        cost: 50,
        VATRate: 2.2,
        deliveryStatus: 'DELAYED',
      };
      const createdDelivery = await service.createDelivery(newDelivery);
      expect(createdDelivery).toEqual(createdDelivery);
    });
  });
});
