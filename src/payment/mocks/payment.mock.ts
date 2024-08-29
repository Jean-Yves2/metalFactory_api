import { Payment } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const paymentMock: Payment[] = [
  {
    paymentId: 1,
    orderId: 1,
    amount: new Decimal(1000),
    paymentDate: new Date('2024-05-01T08:00:00.000Z'),
    paymentMethod: 'CARD',
    transactionId: 'TX123',
    status: 'COMPLETED',
    createdAt: new Date('2024-05-01T08:00:00.000Z'),
    updatedAt: new Date('2024-05-01T08:00:00.000Z'),
    deletedAt: null,
  },
  {
    paymentId: 2,
    orderId: 2,
    amount: new Decimal(1500),
    paymentDate: new Date('2024-05-02T08:00:00.000Z'),
    paymentMethod: 'CARD',
    transactionId: 'TX456',
    status: 'PENDING',
    createdAt: new Date('2024-05-02T08:00:00.000Z'),
    updatedAt: new Date('2024-05-02T08:00:00.000Z'),
    deletedAt: null,
  },
  {
    paymentId: 3,
    orderId: 3,
    amount: new Decimal(750),
    paymentDate: new Date('2024-05-03T08:00:00.000Z'),
    paymentMethod: 'CARD',
    transactionId: 'TX789',
    status: 'COMPLETED',
    createdAt: new Date('2024-05-03T08:00:00.000Z'),
    updatedAt: new Date('2024-05-03T08:00:00.000Z'),
    deletedAt: null,
  },
];
