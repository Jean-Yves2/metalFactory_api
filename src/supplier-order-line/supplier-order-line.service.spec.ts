import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { supplierOrderLineMock } from './mocks/supplier-order-line.mock';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('SupplierOrderLineService', () => {
  let service: SupplierOrderLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SupplierOrderLineService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<SupplierOrderLineService>(SupplierOrderLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSupplierOrderLines', () => {
    it('should return all supplier order lines', async () => {
      expect(await service.getAllSupplierOrderLines()).toEqual(
        supplierOrderLineMock,
      );
    });
  });

  describe('getSupplierOrderLineById', () => {
    it('should return a supplier order line by id', async () => {
      const getSupplierOrderLine = supplierOrderLineMock.find(
        (sol) => sol.id === 1,
      );
      expect(await service.getSupplierOrderLineById(1)).toEqual(
        getSupplierOrderLine,
      );
    });

    it('should throw HttpException when supplier order line is not found', async () => {
      const nonExistingSupplierOrderLineId = 100;
      const getSupplierOrderLinePromise = service.getSupplierOrderLineById(
        nonExistingSupplierOrderLineId,
      );
      await expect(getSupplierOrderLinePromise).rejects.toThrow(
        new HttpException(
          'Supplier order line not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('createSupplierOrderLine', () => {
    it('should create a supplier order line', async () => {
      const createSupplierOrderLine = {
        supplierOrderId: 1,
        productId: 1,
        orderedQuantity: 10,
        unitPriceExclTax: 5.0,
      };
      expect(
        await service.createSupplierOrderLine(createSupplierOrderLine),
      ).toEqual('Supplier order line created successfully');
    });
  });

  describe('updateSupplierOrderLine', () => {
    it('should update a supplier order line', async () => {
      const supplierOrderLineId = 3;
      const updatedSupplierOrderLine = {
        supplierOrderId: 1,
        productId: 2,
        orderedQuantity: 20,
        unitPriceExclTax: 4.5,
        receivedQuantity: 20,
        discrepancy: 0,
        receivedDate: new Date(),
      };
      expect(
        await service.updateSupplierOrderLine(
          supplierOrderLineId,
          updatedSupplierOrderLine,
        ),
      ).toEqual('Supplier order line updated successfully');
    });

    it('should return null when supplier order line is not found', async () => {
      const supplierOrderLineId = 100;
      const updatedSupplierOrderLine = {
        supplierOrderId: 1,
        productId: 2,
        orderedQuantity: 20,
        unitPriceExclTax: 4.5,
        receivedQuantity: 20,
        discrepancy: 0,
        receivedDate: new Date(),
      };
      await expect(
        service.updateSupplierOrderLine(
          supplierOrderLineId,
          updatedSupplierOrderLine,
        ),
      ).rejects.toThrow(
        new HttpException(
          'Supplier order line not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('deleteSupplierOrderLine', () => {
    it('should delete a supplier order line', async () => {
      const supplierOrderLineId = 3;
      expect(
        await service.deleteSupplierOrderLine(supplierOrderLineId),
      ).toEqual('Supplier order line deleted successfully');
    });

    it('should return null when supplier order line is not found', async () => {
      const supplierOrderLineId = 100;
      await expect(
        service.deleteSupplierOrderLine(supplierOrderLineId),
      ).rejects.toThrow(
        new HttpException(
          'Supplier order line not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
