import { Decimal } from '@prisma/client/runtime/library.js';
import { supplierOrderLineMock } from './supplier-order-line.mock';
import { CreateSupplierOrderLineDto } from '../dto/create-supplier-order-line.dto';

export class PrismaServiceMock {
  supplierOrderLine = {
    findMany: jest.fn().mockImplementation(() => {
      return supplierOrderLineMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const orderLine = supplierOrderLineMock.find(
        (orderLine) => orderLine.id === params.where.id,
      );
      return orderLine;
    }),
    create: jest
      .fn()
      .mockImplementation((createDto: CreateSupplierOrderLineDto) => {
        const newOrderLine = {
          id: supplierOrderLineMock.length + 1,
          supplierOrderId: createDto.supplierOrderId,
          productId: createDto.productId,
          orderedQuantity: createDto.orderedQuantity,
          unitPriceExclTax: new Decimal(1000),
          receivedQuantity: createDto.receivedQuantity || 0,
          discrepancy: createDto.discrepancy || null,
          receivedDate: createDto.receivedDate || null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        supplierOrderLineMock.push(newOrderLine);
        return 'Supplier order line created successfully';
      }),

    update: jest.fn().mockImplementation((params) => {
      const orderLine = supplierOrderLineMock.find(
        (orderLine) =>
          orderLine.id === params.where.id && orderLine.deletedAt === null,
      );

      if (!orderLine) return null;

      Object.assign(orderLine, params.data, { updatedAt: new Date() });
      return 'Supplier order line updated successfully';
    }),

    delete: jest.fn().mockImplementation((params) => {
      const index = supplierOrderLineMock.findIndex(
        (orderLine) => orderLine.id === params.where.id,
      );

      if (index !== -1) {
        const deleted = supplierOrderLineMock.splice(index, 1)[0];
        deleted.deletedAt = new Date();
        return deleted;
      } else {
        return null;
      }
    }),
  };
}
