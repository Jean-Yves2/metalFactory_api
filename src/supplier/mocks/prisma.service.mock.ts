import { supplierMock } from './supplier.mock';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
export class PrismaServiceMock {
  supplier = {
    findMany: jest.fn().mockImplementation(() => {
      return supplierMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const supplier = supplierMock.find(
        (supplier) => supplier.id === params.where.id,
      );
      return supplier;
    }),
    create: jest
      .fn()
      .mockImplementation((createSupplierDto: CreateSupplierDto) => {
        const newSupplier = {
          id: supplierMock.length + 1,
          name: createSupplierDto.name,
          SIRET: createSupplierDto.SIRET,
          addressId: 10, // this is a mock value
          contactEmail: createSupplierDto.contactEmail,
          contactPhone: createSupplierDto.contactPhone,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        supplierMock.push(newSupplier);
        return 'Supplier created successfully';
      }),
    update: jest.fn(),
  };
}
