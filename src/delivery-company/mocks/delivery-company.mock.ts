import { DeliveryCompany } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const deliveryCompanyMock: DeliveryCompany[] = [
  {
    id: 1,
    name: 'Delivery Company 1',
    baseRate: new Decimal(45),
    ratePerKm: new Decimal(50),
    weightSurcharge: new Decimal(78),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Delivery Company 2',
    baseRate: new Decimal(2),
    ratePerKm: new Decimal(8),
    weightSurcharge: new Decimal(9),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: new Date('2024-04-18T09:05:38.780Z'),
  },
  {
    id: 3,
    name: 'Delivery Company 3',
    baseRate: new Decimal(2),
    ratePerKm: new Decimal(8),
    weightSurcharge: new Decimal(9),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
];
