import { CreateSupplierOrderLineDto } from '../dto/create-supplier-order-line.dto';
import { supplierOrderLineMock } from './supplier-order-line.mock';
import { Decimal } from '@prisma/client/runtime/library';

export class SupplierOrderLineServiceMock {
  getAllSupplierOrderLines = jest.fn().mockImplementation(() => {
    return supplierOrderLineMock;
  });

  getSupplierOrderLineById = jest.fn().mockImplementation((id: number) => {
    return supplierOrderLineMock.find((line) => line.id === id);
  });

  createSupplierOrderLine = jest
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
    });

  updateSupplierOrderLine = jest
    .fn()
    .mockImplementation((id: number, createDto: CreateSupplierOrderLineDto) => {
      let orderLine = supplierOrderLineMock.find((line) => line.id === id);
      if (orderLine) {
        orderLine = {
          ...orderLine,
          supplierOrderId: createDto.supplierOrderId,
          productId: createDto.productId,
          orderedQuantity: createDto.orderedQuantity,
          unitPriceExclTax: new Decimal(1000),
          receivedQuantity: createDto.receivedQuantity || 0,
          discrepancy: createDto.discrepancy || null,
          receivedDate: createDto.receivedDate || null,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null, // assuming all fields that can be updated are passed in updateDto
        };
        return orderLine;
      } else {
        return null;
      }
    });

  deleteSupplierOrderLine = jest.fn().mockImplementation((id: number) => {
    const index = supplierOrderLineMock.findIndex((line) => line.id === id);
    if (index !== -1) {
      const deleted = supplierOrderLineMock.splice(index, 1)[0];
      return {
        ...deleted,
        deletedAt: new Date(),
      };
    } else {
      return null;
    }
  });
}
