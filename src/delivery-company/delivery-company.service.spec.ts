import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyService } from './delivery-company.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryCompanyPrismaMock } from './mocks/prisma.service.mock';
import { deliveryCompanyMock } from './mocks/delivery-company.mock';

describe('DeliveryCompanyService', () => {
  let service: DeliveryCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeliveryCompanyService,
        {
          provide: PrismaService,
          useClass: DeliveryCompanyPrismaMock,
        },
      ],
    }).compile();

    service = module.get<DeliveryCompanyService>(DeliveryCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllDeliveryCompanies', () => {
    it('should get all delivery companies', async () => {
      const allDeliveryCompanies = deliveryCompanyMock.filter(
        (deliveryCompany) => deliveryCompany.deletedAt === null,
      );
      const deliveryCompanies = await service.getAllDeliveryCompanies();
      expect(deliveryCompanies).toEqual(allDeliveryCompanies);
    });

    it('should throw an error when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].deliveryCompany, 'findMany')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getAllDeliveryCompanies();
      } catch (error) {
        if (error instanceof Error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('Error getting all delivery companies');
        }
      }
    });
  });

  describe('getDeliveryCompanyById', () => {
    it('should get a delivery company by ID', async () => {
      const id = 1;
      const deliveryCompany = deliveryCompanyMock.find(
        (deliveryCompany) =>
          deliveryCompany.id === id && deliveryCompany.deletedAt === null,
      );
      const foundDeliveryCompany = await service.getDeliveryCompanyById(id);
      expect(foundDeliveryCompany).toEqual(deliveryCompany);
    });

    it('should throw an error when the delivery company is not found', async () => {
      const id = 99;
      try {
        await service.getDeliveryCompanyById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should throw an error when there is an internal error', async () => {
      const id = 1;
      jest
        .spyOn(service['prismaService'].deliveryCompany, 'findUnique')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getDeliveryCompanyById(id);
      } catch (error) {
        if (error instanceof Error) {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toEqual('Error getting delivery company by ID');
        }
      }
    });
  });
});
