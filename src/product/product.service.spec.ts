import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /*
  describe('getAllProducts', () => {
    it('should return all products', async () => {
      expect(await service.getAllProducts()).toEqual(productMock);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const getProduct = productMock.find((product) => product.id === 1);
      expect(await service.getProductById(1)).toEqual(getProduct);
    });

    it('should throw HttpException when product is not found', async () => {
      const nonExistingProductId = 100;
      const getUserPromise = service.getProductById(nonExistingProductId);
      await expect(getUserPromise).rejects.toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const createProduct = {
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      expect(await service.createProduct(createProduct)).toEqual(
        'Product created successfully',
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const productId = 3;
      const updatedProduct = {
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      expect(await service.updateProduct(productId, updatedProduct)).toEqual(
        'Product updated successfully',
      );
    });

    it('should return null when product is not found', async () => {
      const productId = 100;
      const updatedProduct = {
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      await expect(
        service.updateProduct(productId, updatedProduct),
      ).rejects.toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('softDelete', () => {
    it('should delete a product', async () => {
      const productId = 3;
      expect(await service.softDelete(productId)).toEqual(
        'Product deleted successfully',
      );
    });

    it('should return null when product is not found', async () => {
      const productId = 100;
      await expect(service.softDelete(productId)).rejects.toThrow(
        new HttpException('Product not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});*/
});
