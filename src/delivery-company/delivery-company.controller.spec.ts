import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyController } from './delivery-company.controller';
import { DeliveryCompanyService } from './delivery-company.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryCompanyServiceMock } from './mocks/delivery-company.service.mock';
import { deliveryCompanyMock } from './mocks/delivery-company.mock';

describe('DeliveryCompanyController', () => {
  let controller: DeliveryCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryCompanyController],
      providers: [
        {
          provide: DeliveryCompanyService,
          useClass: DeliveryCompanyServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<DeliveryCompanyController>(
      DeliveryCompanyController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllDeliveryCompanies', () => {
    it('should return an array of delivery companies', async () => {
      const result = await controller.findAll();
      const search = deliveryCompanyMock.filter(
        (company) => company.deletedAt === null,
      );
      expect(result).toEqual(search);
    });
  });

  describe('getDeliveryCompanyById', () => {
    it('should return a delivery company by id', async () => {
      const id = 1; // 1 is verified result
      const getCompany = deliveryCompanyMock.find(
        (company) => company.id === id && company.deletedAt === null,
      );
      expect(await controller.findOne(id)).toEqual(getCompany);
    });
  });

  describe('createDeliveryCompany', () => {
    it('should create a delivery company', async () => {
      const newCompany = {
        name: 'Delivery Company 4',
        baseRate: 2,
        ratePerKm: 8,
        weightSurcharge: 9,
      };
      expect(await controller.create(newCompany)).toEqual(
        'Delivery company created successfully',
      );
    });
  });

  describe('updateDeliveryCompany', () => {
    it('should update a delivery company', async () => {
      const id = 1; // 1 is verified result
      const dataForUpdateCompany = {
        name: 'Delivery Company 1',
        baseRate: 99,
        ratePerKm: 99,
        weightSurcharge: 99,
      };
      expect(await controller.update(id, dataForUpdateCompany)).toEqual(
        'Delivery company updated successfully',
      );
    });
  });

  describe('removeDeliveryCompany', () => {
    it('should remove a delivery company', async () => {
      const id = 1; // 1 is verified result
      expect(await controller.remove(id)).toEqual('Delivery company deleted');
    });
  });
});
