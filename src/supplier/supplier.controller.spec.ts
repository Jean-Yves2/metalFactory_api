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

  describe('updateSupplier', () => {
    it('should update a supplier', async () => {
      const dataForUpdateSupplier = {
        name: 'New Name of the Supplier', // Test the update of the name
        SIRET: '',
        address: {
          // Can't update the address here ,we make it on the address controller.spec.ts
          street: '123 gjgRue du Foughjhkgrnisseur',
          city: 'Ville du Foufhfrnjghjiskseur',
          postalCode: '12ggk345',
          country: 'Pakys gjdu Fourjhgnisseur',
        },
        contactEmail: 'Terrill22@hotmail.com',
        contactPhone: '386-412-6992',
      };
      expect(await controller.updateSupplier(3, dataForUpdateSupplier)).toEqual(
        {
          id: 3,
          name: 'New Name of the Supplier',
          SIRET: '',
          addressId: 57,
          contactEmail: 'Terrill22@hotmail.com',
          contactPhone: '386-412-6992',
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          deletedAt: null,
        },
      );
    });
  });
});
