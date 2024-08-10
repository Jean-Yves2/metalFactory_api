import { productMock } from './product.mock';
import { CreateProductDto } from '../dto/create-product.dto';
export class PrismaServiceMock {
 /* product = {
    findMany: jest.fn().mockImplementation(() => {
      return productMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const product = productMock.find(
        (product) => product.id === params.where.id,
      );
      return product;
    }),
    create: jest
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
      }),

    update: jest.fn().mockImplementation((params) => {
      const product = productMock.find(
        (product) =>
          product.id === params.where.id && product.deletedAt === null,
      );

      product.name = params.data.name;
      product.description = params.data.description;
      product.basePrice = params.data.basePrice;
      product.unitPriceExclTax = params.data.unitPriceExclTax;
      product.VATRate = params.data.VATRate;
      product.marginPercent = params.data.marginPercent;
      product.linearWeight = params.data.linearWeight;
      product.updatedAt = new Date();

      return 'Product updated successfully';
    }),
  };*/
}
