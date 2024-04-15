export class SupplierServiceMock {
  // this is a mock class that will be used to replace the real SupplierService class
  // In code this.supplierService.getAllSuppliers() will be replaced with this.getAllSuppliers() in my mock class
  getAllSuppliers = jest.fn();
  getSupplierById = jest.fn();
  createSupplier = jest.fn();
  updateSupplier = jest.fn();
  softeDeleteSupplier = jest.fn();
}
