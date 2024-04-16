import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { supplierMock } from './supplier.mock';
export class SupplierServiceMock {
  // this is a mock class that will be used to replace the real SupplierService class
  // In code this.supplierService.getAllSuppliers() will be replaced with this.getAllSuppliers() in my mock class
  getAllSuppliers = jest.fn().mockImplementation(() => {
    return supplierMock;
  });

  getSupplierById = jest.fn().mockImplementation((id: number) => {
    return supplierMock.find((supplier) => supplier.id === id);
  });

  createSupplier = jest
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
    });

  updateSupplier = jest
    .fn()
    .mockImplementation((id: number, createSupplierDto: CreateSupplierDto) => {
      const supplier = supplierMock.find((supplier) => supplier.id === id);
      const updateSupplier = {
        ...supplier,
        name: createSupplierDto.name,
        SIRET: createSupplierDto.SIRET,
        contactEmail: createSupplierDto.contactEmail,
        contactPhone: createSupplierDto.contactPhone,
        updatedAt: new Date(),
      };
      return updateSupplier;
    });

  softeDeleteSupplier = jest.fn().mockImplementation((id: number) => {
    const supplier = supplierMock.find((supplier) => supplier.id === id);
    const deleteSupplier = {
      ...supplier,
      deletedAt: new Date(),
    };
    return deleteSupplier;
  });
}
