import { deliveryMock } from './delivery.mock';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { Delivery } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
export class DeliveryServiceMock {
  getAllDeliveries = jest.fn().mockImplementation(() => {
    return deliveryMock;
  });

  getDeliveryById = jest.fn().mockImplementation((id: number) => {
    return deliveryMock.find((delivery) => delivery.id === id);
  });

  createDelivery = jest
    .fn()
    .mockImplementation((createDeliveryDto: CreateDeliveryDto) => {
      const newDelivery: Delivery = {
        id: deliveryMock.length + 1,
        orderId: createDeliveryDto.orderId,
        deliveryCompanyId: createDeliveryDto.deliveryCompanyId,
        distance: createDeliveryDto.distance,
        weight: new Decimal(createDeliveryDto.weight),
        cost: new Decimal(createDeliveryDto.cost),
        VATRate: new Decimal(createDeliveryDto.VATRate),
        deliveryStatus: createDeliveryDto.deliveryStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      deliveryMock.push(newDelivery);
      return 'Delivery created successfully';
    });

  updateDelivery = jest
    .fn()
    .mockImplementation((id: number, createDeliveryDto: CreateDeliveryDto) => {
      const index = deliveryMock.findIndex((delivery) => delivery.id === id);

      deliveryMock[index] = {
        ...deliveryMock[index],
        orderId: createDeliveryDto.orderId,
        deliveryCompanyId: createDeliveryDto.deliveryCompanyId,
        distance: createDeliveryDto.distance,
        weight: new Decimal(createDeliveryDto.weight),
        cost: new Decimal(createDeliveryDto.cost),
        VATRate: new Decimal(createDeliveryDto.VATRate),
        deliveryStatus: createDeliveryDto.deliveryStatus,
        updatedAt: new Date(),
      };

      return 'Delivery updated successfully';
    });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const index = deliveryMock.findIndex((delivery) => delivery.id === id);

    deliveryMock[index] = {
      ...deliveryMock[index],
      deletedAt: new Date(),
    };

    return 'Delivery deleted successfully';
  });
}
