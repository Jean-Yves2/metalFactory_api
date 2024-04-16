import { supplierMock } from './supplier.mock';
export class PrismaServiceMock {
  supplier = {
    findMany: jest.fn().mockImplementation(() => {
      return supplierMock;
    }),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}
