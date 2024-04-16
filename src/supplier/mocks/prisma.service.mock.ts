import { HttpException, HttpStatus } from '@nestjs/common';
import { supplierMock } from './supplier.mock';
export class PrismaServiceMock {
  supplier = {
    findMany: jest.fn().mockImplementation(() => {
      return supplierMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const supplier = supplierMock.find(
        (supplier) => supplier.id === params.where.id,
      );
      if (!supplier) {
        throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
      }
      return supplier;
    }),
    create: jest.fn(),
    update: jest.fn(),
  };
}
