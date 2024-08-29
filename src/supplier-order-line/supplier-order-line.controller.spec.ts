import { Test, TestingModule } from '@nestjs/testing';
import { SupplierOrderLineController } from './supplier-order-line.controller';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { CreateSupplierOrderLineDto } from './dto/create-supplier-order-line.dto';
import { SupplierOrderLineServiceMock } from './mocks/supplier-order-line.service.mock';
import { supplierOrderLineMock } from './mocks/supplier-order-line.mock';
import { Decimal } from '@prisma/client/runtime/library';
describe('SupplierOrderLineController', () => {
  let controller: SupplierOrderLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplierOrderLineController],
      providers: [
        {
          provide: SupplierOrderLineService,
          useClass: SupplierOrderLineServiceMock,
        },
      ],
    }).compile();

    controller = module.get<SupplierOrderLineController>(
      SupplierOrderLineController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllSupplierOrderLines', () => {
    it('should return all supplier order lines', async () => {
      expect(await controller.getAllSupplierOrderLines()).toEqual(
        supplierOrderLineMock,
      );
    });
  });

  describe('getSupplierOrderLineById', () => {
    it('should return a supplier order line by id', async () => {
      const getSupplierOrderLine = supplierOrderLineMock.find(
        (sol) => sol.id === 1,
      );
      expect(await controller.getSupplierOrderLineById(1)).toEqual(
        getSupplierOrderLine,
      );
    });
  });

  describe('createSupplierOrderLine', () => {
    it('should create a supplier order line', async () => {
      const newSupplierOrderLine: CreateSupplierOrderLineDto = {
        supplierOrderId: 1,
        productId: 2,
        orderedQuantity: 10,
        unitPriceExclTax: 5.0,
      };
      expect(
        await controller.createSupplierOrderLine(newSupplierOrderLine),
      ).toEqual('Supplier order line created successfully');
    });
  });

  describe('updateSupplierOrderLine', () => {
    it('should update a supplier order line', async () => {
      const dataForUpdateSupplierOrderLine: CreateSupplierOrderLineDto = {
        supplierOrderId: 1,
        productId: 2,
        orderedQuantity: 15,
        unitPriceExclTax: 1000,
        receivedQuantity: 0,
      };
      expect(
        await controller.updateSupplierOrderLine(
          1,
          dataForUpdateSupplierOrderLine,
        ),
      ).toEqual({
        id: 1,
        supplierOrderId: 1,
        productId: 2,
        orderedQuantity: 15,
        unitPriceExclTax: new Decimal(1000),
        receivedQuantity: 0,
        discrepancy: null,
        receivedDate: null,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('deleteSupplierOrderLine', () => {
    it('should delete a supplier order line', async () => {
      expect(await controller.deleteSupplierOrderLine(1)).toEqual({
        id: 1,
        supplierOrderId: 1,
        productId: 10,
        orderedQuantity: 100,
        unitPriceExclTax: new Decimal(15.5),
        receivedQuantity: 50,
        discrepancy: 5,
        receivedDate: new Date('2024-05-01T09:00:00.000Z'),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      });
    });
  });
});
