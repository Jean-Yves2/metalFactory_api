import { CreateProductDto } from '../dto/create-product.dto';
import { productMock } from './product.mock';
export class ProductServiceMock {
  // this is a mock class that will be used to replace the real SupplierService class
  // In code this.supplierService.getAllSuppliers() will be replaced with this.getAllSuppliers() in my mock class
  getAllProducts = jest.fn().mockImplementation(() => {
    return productMock;
  });

  getProductById = jest.fn().mockImplementation((id: number) => {
    return productMock.find((product) => product.id === id);
  });

  createProduct = jest
    .fn()
    .mockImplementation((createProductDto: CreateProductDto) => {
      const newProduct = {
        id: productMock.length + 1,
        name: createProductDto.name,
        description: createProductDto.description,
        basePrice: createProductDto.basePrice,
        unitPriceExclTax: createProductDto.unitPriceExclTax,
        VATRate: createProductDto.VATRate,
        marginPercent: createProductDto.marginPercent,
        linearWeight: createProductDto.linearWeight,
        sellingPrice: createProductDto.sellingPrice,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      productMock.push(newProduct);
      return 'Product created successfully';
    });

  updateProduct = jest
    .fn()
    .mockImplementation((id: number, createProductDto: CreateProductDto) => {
      const product = productMock.find((product) => product.id === id);
      const updateProduct = {
        ...product,
        name: createProductDto.name,
        description: createProductDto.description,
        basePrice: createProductDto.basePrice,
        unitPriceExclTax: createProductDto.unitPriceExclTax,
        VATRate: createProductDto.VATRate,
        marginPercent: createProductDto.marginPercent,
        linearWeight: createProductDto.linearWeight,
        sellingPrice: createProductDto.sellingPrice,
        updatedAt: new Date(),
      };
      return updateProduct;
    });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const product = productMock.find((product) => product.id === id);
    const deleteProduct = {
      ...product,
      deletedAt: new Date(),
    };
    return deleteProduct;
  });
}
