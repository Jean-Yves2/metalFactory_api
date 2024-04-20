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
});
