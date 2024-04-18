import { Stock } from '@prisma/client';
export const stockMock: Stock[] = [
  {
    id: 1,
    warehouseId: 1,
    productId: 1,
    quantity: 100,
    minThreshold: 10,
    lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },

  {
    id: 2,
    warehouseId: 1,
    productId: 2,
    quantity: 109,
    minThreshold: 10,
    lastUpdated: new Date('2024-04-18T09:05:38.780Z'),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
];
