import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { orderMock } from './mocks/order.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      expect(await service.getAllOrders()).toEqual(orderMock);
    });
  });

  describe('getOrderById', () => {
    it('should return a order by id', async () => {
      const getOrder = orderMock.find((order) => order.id === 1);
      expect(await service.getOrderById(1)).toEqual(getOrder);
    });

    it('should throw HttpException when order is not found', async () => {
      const nonExistingOrderId = 100;
      const getUserPromise = service.getOrderById(nonExistingOrderId);
      await expect(getUserPromise).rejects.toThrow(
        new HttpException('Order not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createOrder', () => {
    it('should create a order', async () => {
      const createOrder = {
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
      expect(await service.createOrder(createOrder)).toEqual(
        'Order created successfully',
      );
    });
  });

  describe('updateOrder', () => {
    it('should update a order', async () => {
      const orderId = 3;
      const updatedOrder = {
        customerId: 1,
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        totalExclTax: new Decimal('4882'),
        totalInclTax: new Decimal('7892'),
        deliveryAddressId: 1,
      };
      expect(await service.updateOrder(orderId, updatedOrder)).toEqual(
        'Order updated successfully',
      );
    });

    it('should return null when order is not found', async () => {
      const orderId = 100;
      const updatedOrder = {
        customerId: 1,
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        totalExclTax: new Decimal('4882'),
        totalInclTax: new Decimal('7892'),
        deliveryAddressId: 1,
      };
      await expect(service.updateOrder(orderId, updatedOrder)).rejects.toThrow(
        new HttpException('Order not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('deleteOrder', () => {
    it('should delete a order', async () => {
      const orderId = 3;
      expect(await service.deleteOrder(orderId)).toEqual(
        'Order deleted successfully',
      );
    });

    it('should return null when order is not found', async () => {
      const orderId = 100;
      await expect(service.deleteOrder(orderId)).rejects.toThrow(
        new HttpException('Order not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
