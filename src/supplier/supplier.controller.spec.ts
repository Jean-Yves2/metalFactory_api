import { Test, TestingModule } from '@nestjs/testing';
import { SupplierController } from './supplier.controller';
import { SupplierService } from './supplier.service';
//import { PrismaService } from '../database/prisma/prisma.service';
import { SupplierServiceMock } from './mocks/supplier.service.mock';
import { SupplierMock } from './mocks/supplier.mock';

describe('SupplierController', () => {
  let controller: SupplierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierController],
      providers: [{ provide: SupplierService, useClass: SupplierServiceMock }],
    }).compile();

    controller = module.get<SupplierController>(SupplierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAllSuppliers', () => {
    it('should return all suppliers', async () => {
      expect(await controller.getAllSuppliers()).toEqual(SupplierMock);
    });
  });

  describe('getSupplierById', () => {
    it('should return a supplier by id', async () => {
      const getSupplier = SupplierMock.find((supplier) => supplier.id === 1);
      expect(await controller.getSupplierById(1)).toEqual(getSupplier);
    });
  });

  describe('createSupplier', () => {
    it('should create a supplier', async () => {
      const newSupplier = {
        name: 'Nom du fsfsdfghgoujhkhrnjkljlkisseur',
        SIRET: '1234564647890004500',
        address: {
          street: '123 gjgRue du Foughjhkgrnisseur',
          city: 'Ville du Foufhfrnjghjiskseur',
          postalCode: '12ggk345',
          country: 'Pakys gjdu Fourjhgnisseur',
        },
        contactEmail: 'fouhkgjgrhjgnisseur@example.com',
        contactPhone: '012300023456789',
        Bella: 'ghkjhjjf',
      };
      expect(await controller.createSupplier(newSupplier)).toEqual(
        'Supplier created successfully',
      );
    });
  });
});
