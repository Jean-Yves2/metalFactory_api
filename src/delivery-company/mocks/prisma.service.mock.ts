import { deliveryCompanyMock } from './delivery-company.mock';

export class DeliveryCompanyPrismaMock {
  deliveryCompany = {
    findMany: jest.fn().mockImplementation(() => {
      const allDeliveryCompanies = deliveryCompanyMock.filter(
        (deliveryCompany) => deliveryCompany.deletedAt === null,
      );
      return allDeliveryCompanies;
    }),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}
