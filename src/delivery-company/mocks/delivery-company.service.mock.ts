import { deliveryCompanyMock } from './delivery-company.mock';

export class DeliveryCompanyServiceMock {
  getAllDeliveryCompanies = jest.fn().mockImplementation(() => {
    const allDeliveryCompanies = deliveryCompanyMock.filter(
      (deliveryCompany) => deliveryCompany.deletedAt === null,
    );
    return allDeliveryCompanies;
  });
  getDeliveryCompanyById = jest.fn();
  createDeliveryCompany = jest.fn();
  updateDeliveryCompany = jest.fn();
}
