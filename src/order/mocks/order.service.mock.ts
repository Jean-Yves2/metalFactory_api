import { CreateOrderDto } from '../dto/create-order.dto';
import { orderMock } from './order.mock';
export class OrderServiceMock {
  // this is a mock class that will be used to replace the real orderService class
  // In code this.orderService.getAllOrders() will be replaced with this.getAllOrders() in my mock class
  getAllOrders = jest.fn().mockImplementation(() => {
    return orderMock;
  });

  getOrderById = jest.fn().mockImplementation((id: number) => {
    return orderMock.find((order) => order.id === id);
  });

  createOrder = jest
    .fn()
    .mockImplementation((createOrderDto: CreateOrderDto) => {
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
    });

  updateOrder = jest
    .fn()
    .mockImplementation((id: number, createOrderDto: CreateOrderDto) => {
      const order = orderMock.find((order) => order.id === id);
      const updateOrder = {
        ...order,
        customerId: createOrderDto.customerId,
        orderDate: new Date(),
        status: createOrderDto.status,
        totalExclTax: createOrderDto.totalExclTax,
        totalInclTax: createOrderDto.totalInclTax,
        deliveryAddressId: createOrderDto.deliveryAddressId,
        updatedAt: new Date(),
      };
      return updateOrder;
    });

  deleteOrder = jest.fn().mockImplementation((id: number) => {
    const order = orderMock.find((order) => order.id === id);
    const deleteOrder = {
      ...order,
      deletedAt: new Date(),
    };
    return deleteOrder;
  });
}
