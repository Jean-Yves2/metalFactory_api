import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { SupplierMock } from './supplier.mock';
export class SupplierServiceMock {
  // this is a mock class that will be used to replace the real SupplierService class
  // In code this.supplierService.getAllSuppliers() will be replaced with this.getAllSuppliers() in my mock class
  getAllSuppliers = jest.fn().mockImplementation(() => {
    return SupplierMock;
  });

  getSupplierById = jest.fn().mockImplementation((id: number) => {
    return SupplierMock.find((supplier) => supplier.id === id);
  });
  createSupplier = jest
    .fn()
    .mockImplementation((createSupplierDto: CreateSupplierDto) => {
      const newSupplier = {
        id: SupplierMock.length + 1,
        name: createSupplierDto.name,
        SIRET: createSupplierDto.SIRET,
        addressId: 10, // this is a mock value
        contactEmail: createSupplierDto.contactEmail,
        contactPhone: createSupplierDto.contactPhone,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      SupplierMock.push(newSupplier);
      return 'Supplier created successfully';
    });
  updateSupplier = jest.fn();
  softeDeleteSupplier = jest.fn();
}
