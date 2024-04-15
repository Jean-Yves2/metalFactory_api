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
});
