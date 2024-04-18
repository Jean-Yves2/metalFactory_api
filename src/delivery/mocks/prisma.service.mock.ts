import { InternalServerErrorException } from '@nestjs/common';
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
  };
}
