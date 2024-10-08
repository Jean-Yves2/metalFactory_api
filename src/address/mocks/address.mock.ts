import { Address } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const addressMock: Address[] = [
  {
    id: 1,
    street: 'Street 1',
    postalCode: '12345',
    city: 'City 1',
    country: 'Country 1',
    distanceToWarehouse: new Decimal(20),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
  {
    id: 2,
    street: 'Street 2',
    postalCode: '12345',
    city: 'City 2',
    country: 'Country 2',
    distanceToWarehouse: new Decimal(20),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: new Date('2024-04-18T09:05:38.780Z'),
  },
  {
    id: 3,
    street: 'Street 3',
    postalCode: '12345',
    city: 'City 3',
    country: 'Country 3',
    distanceToWarehouse: new Decimal(20),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
];
