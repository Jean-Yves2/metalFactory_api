import { Quote, QuoteStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const quoteMock: Quote[] = [
  {
    id: 1,
    clientId: 1,
    dateIssued: new Date('2024-04-18T09:05:38.780Z'),
    status: QuoteStatus.PENDING,
    totalPrice: new Decimal(100),
    discountId: 1,
    totalPriceAfterDiscount: new Decimal(90),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
  {
    id: 2,
    clientId: 2,
    dateIssued: new Date('2024-04-18T09:05:38.780Z'),
    status: QuoteStatus.CLOSED,
    totalPrice: new Decimal(100),
    discountId: 1,
    totalPriceAfterDiscount: new Decimal(90),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: new Date('2024-04-18T09:05:38.780Z'),
  },
  {
    id: 3,
    clientId: 3,
    dateIssued: new Date('2024-04-18T09:05:38.780Z'),
    status: QuoteStatus.IN_PROCESS,
    totalPrice: new Decimal(100),
    discountId: 1,
    totalPriceAfterDiscount: new Decimal(90),
    createdAt: new Date('2024-04-18T09:05:38.780Z'),
    updatedAt: new Date('2024-04-18T09:05:38.780Z'),
    deletedAt: null,
  },
];
