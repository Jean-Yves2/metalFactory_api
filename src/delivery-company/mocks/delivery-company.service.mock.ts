import { deliveryCompanyMock } from './delivery-company.mock';

export class DeliveryCompanyServiceMock {
  getAllDeliveryCompanies = jest.fn().mockImplementation(() => {
    const allDeliveryCompanies = deliveryCompanyMock.filter(
      (deliveryCompany) => deliveryCompany.deletedAt === null,
    );
    return allDeliveryCompanies;
  });
  getDeliveryCompanyById = jest.fn().mockImplementation((id: number) => {
    return deliveryCompanyMock.find(
      (deliveryCompany) =>
        deliveryCompany.id === id && deliveryCompany.deletedAt === null,
    );
  });
  createDeliveryCompany = jest.fn();
  updateDeliveryCompany = jest.fn();
}
