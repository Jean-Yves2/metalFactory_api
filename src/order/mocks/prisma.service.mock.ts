import { orderMock } from './order.mock';
import { CreateOrderDto } from '../dto/create-order.dto';
export class PrismaServiceMock {
  order = {
    findMany: jest.fn().mockImplementation(() => {
      return orderMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const order = orderMock.find((order) => order.id === params.where.id);
      return order;
    }),
    create: jest.fn().mockImplementation((createOrderDto: CreateOrderDto) => {
      const newOrder = {
        id: orderMock.length + 1,
        customerId: createOrderDto.customerId,
        orderDate: new Date(),
        status: createOrderDto.status,
        totalExclTax: createOrderDto.totalExclTax,
        totalInclTax: createOrderDto.totalInclTax,
        deliveryAddressId: createOrderDto.deliveryAddressId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      orderMock.push(newOrder);
      return 'Order created successfully';
    }),

    update: jest.fn().mockImplementation((params) => {
      const order = orderMock.find(
        (order) => order.id === params.where.id && order.deletedAt === null,
      );

      order.customerId = params.data.customerId;
      order.orderDate = new Date();
      order.status = params.data.status;
      order.totalExclTax = params.data.totalExclTax;
      order.totalInclTax = params.data.totalInclTax;
      order.deliveryAddressId = params.data.deliveryAddressId;
      order.updatedAt = new Date();

      return 'Order updated successfully';
    }),
  };
}
