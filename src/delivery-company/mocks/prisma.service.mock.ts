import { deliveryCompanyMock } from './delivery-company.mock';
import { CreateDeliveryCompanyDto } from '../dto/create-delivery-company.dto';

export class DeliveryCompanyPrismaMock {
  deliveryCompany = {
    findMany: jest.fn().mockImplementation(() => {
      const allDeliveryCompanies = deliveryCompanyMock.filter(
        (deliveryCompany) => deliveryCompany.deletedAt === null,
      );
      return allDeliveryCompanies;
    }),
    findUnique: jest.fn().mockImplementation(({ where: { id } }: any) => {
      return deliveryCompanyMock.find(
        (deliveryCompany) =>
          deliveryCompany.id === id && deliveryCompany.deletedAt === null,
      );
    }),
    create: jest
      .fn()
      .mockImplementation(
        (createDeliveryCompanyDto: CreateDeliveryCompanyDto) => {
          const newDeliveryCompany = {
            id: deliveryCompanyMock.length + 1,
            name: createDeliveryCompanyDto.name,
            baseRate: createDeliveryCompanyDto.baseRate,
            ratePerKm: createDeliveryCompanyDto.ratePerKm,
            weightSurcharge: createDeliveryCompanyDto.weightSurcharge,

            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          };

          return 'Delivery company created successfully';
        },
      ),
    update: jest.fn().mockImplementation(({ where: { id }, data }: any) => {
      const index = deliveryCompanyMock.findIndex(
        (deliveryCompany) =>
          deliveryCompany.id === id && deliveryCompany.deletedAt === null,
      );
      deliveryCompanyMock[index] = {
        ...deliveryCompanyMock[index],
        ...data,
        updatedAt: new Date(),
      };
      return 'Delivery company updated successfully';
    }),
  };
}
