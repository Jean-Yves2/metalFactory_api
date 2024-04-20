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
});
