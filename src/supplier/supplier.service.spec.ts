import { Test, TestingModule } from '@nestjs/testing';
import { SupplierService } from './supplier.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { supplierMock } from './mocks/supplier.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('SupplierService', () => {
  let service: SupplierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<SupplierService>(SupplierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSuppliers', () => {
    it('should return all suppliers', async () => {
      expect(await service.getAllSuppliers()).toEqual(supplierMock);
    });
  });

  describe('getSupplierById', () => {
    it('should return a supplier by id', async () => {
      const getSupplier = supplierMock.find((supplier) => supplier.id === 1);
      expect(await service.getSupplierById(1)).toEqual(getSupplier);
    });

    it('should throw HttpException when supplier is not found', async () => {
      const nonExistingSupplierId = 100;
      const getUserPromise = service.getSupplierById(nonExistingSupplierId);
      await expect(getUserPromise).rejects.toThrow(
        new HttpException('Supplier not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createSupplier', () => {
    it('should create a supplier', async () => {
      const createSupplier = {
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
      expect(await service.createSupplier(createSupplier)).toEqual(
        'Supplier created successfully',
      );
    });
  });
});
