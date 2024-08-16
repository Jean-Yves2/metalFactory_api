import { Delivery, DeliveryStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const deliveryMock: Delivery[] = [
  {
    id: 1,
    orderId: 1,
    deliveryCompanyId: 1,
    distance: 201,
    weight: new Decimal(102),
    cost: new Decimal(50.22),
    VATRate: new Decimal(22),
    deliveryStatus: DeliveryStatus.DELIVERED,
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
  {
    id: 2,
    orderId: 1,
    deliveryCompanyId: 1,
    distance: 201,
    weight: new Decimal(102),
    cost: new Decimal(50.22),
    VATRate: new Decimal(22),
    deliveryStatus: DeliveryStatus.DELIVERED,
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: new Date('2024-04-18T09:05:38.780Z'),
  },
];
