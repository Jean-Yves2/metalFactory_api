import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
//import { PrismaService } from '../database/prisma/prisma.service';
import { ProductServiceMock } from './mocks/product.service.mock';
describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [{ provide: ProductService, useClass: ProductServiceMock }],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  /*
  describe('getAllProducts', () => {
    it('should return all products', async () => {
      expect(await controller.findAll()).toEqual(productMock);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const getProduct = productMock.find((product) => product.id === 1);
      expect(await controller.findOne(1)).toEqual(getProduct);
    });
  });

  describe('createProduct', () => {
    it('should create a product', async () => {
      const newProduct = {
        id: 1,
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
      expect(await controller.create(newProduct)).toEqual(
        'Product created successfully',
      );
    });
  });

  describe('updateProduct', () => {
    it('should update a product', async () => {
      const dataForUpdateProduct = {
        id: 1,
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
      };
      expect(await controller.update(1, dataForUpdateProduct)).toEqual({
        id: 1,
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('softDelete', () => {
    it('should delete a product', async () => {
      expect(await controller.remove(1)).toEqual({
        id: 1,
        name: 'name one',
        description: 'description one',
        basePrice: new Decimal(648),
        unitPriceExclTax: new Decimal(1684),
        VATRate: new Decimal(684),
        marginPercent: new Decimal(642),
        linearWeight: new Decimal(54),
        sellingPrice: new Decimal(14),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      }); // We don't return anything when we delete a supplier
    });
  });*/
});
