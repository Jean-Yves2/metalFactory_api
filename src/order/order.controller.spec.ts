import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
//import { PrismaService } from '../database/prisma/prisma.service';
import { OrderServiceMock } from './mocks/order.service.mock';
import { orderMock } from './mocks/order.mock';
import { Decimal } from '@prisma/client/runtime/library';
import { OrderStatus } from '@prisma/client';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useClass: OrderServiceMock }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      expect(await controller.getAllOrders()).toEqual(orderMock);
    });
  });

  describe('getOrderById', () => {
    it('should return a order by id', async () => {
      const getOrder = orderMock.find((order) => order.id === 1);
      expect(await controller.getOrderById(1)).toEqual(getOrder);
    });
  });

  describe('createOrder', () => {
    it('should create a order', async () => {
      const newOrder = {
        id: 1,
        customerId: 1,
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        totalExclTax: new Decimal('4882'),
        totalInclTax: new Decimal('7892'),
        deliveryAddressId: 1,
        createdAt: new Date('2024-03-19T11:32:13.557Z'),
        updatedAt: new Date('2024-03-19T11:32:13.557Z'),
        deletedAt: null,
      };
      expect(await controller.createOrder(newOrder)).toEqual(
        'Order created successfully',
      );
    });
  });

  describe('updateOrder', () => {
    it('should update a order', async () => {
      const result = await controller.updateOrder(1, {
        customerId: 1,
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        totalExclTax: new Decimal('4882'),
        totalInclTax: new Decimal('7892'),
        deliveryAddressId: 1,
      });
      expect(result).toBeDefined();
    });
  });

  describe('deletedOrder', () => {
    it('should soft delete a quote', async () => {
      const result = await controller.deleteOrder(1);
      expect(result).toBeDefined();
    });
  });
});
