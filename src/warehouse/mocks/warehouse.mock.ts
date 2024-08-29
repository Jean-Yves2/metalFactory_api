import { Warehouse } from '@prisma/client';

export const warehouseMock: Warehouse[] = [
  {
    id: 1,
    name: 'Pagac, Predovic and Sanford',
    addressId: 73,
    createdAt: new Date('2024-03-19T11:32:13.557Z'),
    updatedAt: new Date('2024-03-19T11:32:13.557Z'),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Fisher - Howell',
    addressId: 74,
    createdAt: new Date('2024-03-19T11:32:17.534Z'),
    updatedAt: new Date('2024-03-19T11:32:17.534Z'),
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Quitzon, Medhurst and Mann',
    addressId: 57,
    createdAt: new Date('2024-03-19T11:17:15.273Z'),
    updatedAt: new Date('2024-03-19T11:33:08.092Z'),
    deletedAt: null,
  },
];
