import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { deliveryMock } from './delivery.mock';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';

export class PrismaServiceMock {
  delivery = {
    findMany: jest.fn().mockImplementation(() => {
      try {
        const activeDeliveries = deliveryMock.filter(
          (delivery) => delivery.deletedAt === null,
        );
        return activeDeliveries;
      } catch (error) {
        throw new InternalServerErrorException('Error getting all deliveries');
      }
    }),

    findUnique: jest.fn().mockImplementation(({ where: { id } }: any) => {
      const delivery = deliveryMock.find((delivery) => delivery.id === id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      return delivery;
    }),
    create: jest
      .fn()
      .mockImplementation((createDeliveryDto: CreateDeliveryDto) => {
        const newDelivery = {
          id: deliveryMock.length + 1,
          orderId: createDeliveryDto.orderId,
          deliveryCompanyId: createDeliveryDto.deliveryCompanyId,
          distance: createDeliveryDto.distance,
          weight: createDeliveryDto.weight,
          cost: createDeliveryDto.cost,
          VATRate: createDeliveryDto.VATRate,
          deliveryStatus: createDeliveryDto.deliveryStatus,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        return newDelivery;
      }),
    update: jest.fn().mockImplementation(({ where: { id }, data }: any) => {
      const delivery = deliveryMock.find((delivery) => delivery.id === id);
      if (!delivery) {
        throw new NotFoundException(`Delivery with ID ${id} not found`);
      }
      const updatedDelivery = {
        ...delivery,
        ...data,
        updatedAt: new Date(),
      };
      return updatedDelivery;
    }),
  };
}
