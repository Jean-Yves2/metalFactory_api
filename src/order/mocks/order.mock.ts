import { Order, OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const orderMock: Order[] = [
  {
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
  },
  {
    id: 2,
    customerId: 2,
    orderDate: new Date(),
    status: OrderStatus.PENDING,
    totalExclTax: new Decimal('4882'),
    totalInclTax: new Decimal('7892'),
    deliveryAddressId: 2,
    createdAt: new Date('2024-03-19T11:32:13.557Z'),
    updatedAt: new Date('2024-03-19T11:32:13.557Z'),
    deletedAt: null,
  },
  {
    id: 3,
    customerId: 3,
    orderDate: new Date(),
    status: OrderStatus.PENDING,
    totalExclTax: new Decimal('4882'),
    totalInclTax: new Decimal('7892'),
    deliveryAddressId: 3,
    createdAt: new Date('2024-03-19T11:32:13.557Z'),
    updatedAt: new Date('2024-03-19T11:32:13.557Z'),
    deletedAt: null,
  },
];
