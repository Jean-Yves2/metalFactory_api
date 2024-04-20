export class DeliveryCompanyPrismaMock {
  deliveryCompany = {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}
