import { SupplierOrderLine } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export const supplierOrderLineMock: SupplierOrderLine[] = [
  {
    id: 1,
    supplierOrderId: 1,
    productId: 10,
    orderedQuantity: 100,
    unitPriceExclTax: new Decimal(15.5),
    receivedQuantity: 50,
    discrepancy: 5,
    receivedDate: new Date('2024-05-01T09:00:00Z'),
    createdAt: new Date('2024-04-15T09:00:00Z'),
    updatedAt: new Date('2024-04-30T09:00:00Z'),
    deletedAt: null,
  },
  {
    id: 2,
    supplierOrderId: 1,
    productId: 11,
    orderedQuantity: 200,
    unitPriceExclTax: new Decimal(7.5),
    receivedQuantity: 200,
    discrepancy: 0,
    receivedDate: new Date('2024-05-01T09:00:00Z'),
    createdAt: new Date('2024-04-15T09:00:00Z'),
    updatedAt: new Date('2024-04-30T09:00:00Z'),
    deletedAt: null,
  },
  {
    id: 3,
    supplierOrderId: 2,
    productId: 12,
    orderedQuantity: 300,
    unitPriceExclTax: new Decimal(5.0),
    receivedQuantity: 290,
    discrepancy: 10,
    receivedDate: new Date('2024-05-05T09:00:00Z'),
    createdAt: new Date('2024-04-20T09:00:00Z'),
    updatedAt: new Date('2024-05-04T09:00:00Z'),
    deletedAt: null,
  },
];
