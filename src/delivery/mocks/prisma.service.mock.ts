import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { deliveryMock } from './delivery.mock';

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
  };
}
