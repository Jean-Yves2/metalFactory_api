import { Decimal } from '@prisma/client/runtime/library';
import { CreateDeliveryCompanyDto } from '../dto/create-delivery-company.dto';
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
  createDeliveryCompany = jest
    .fn()
    .mockImplementation(
      (createDeliveryCompanyDto: CreateDeliveryCompanyDto) => {
        const newDeliveryCompany = {
          id: deliveryCompanyMock.length + 1,
          name: createDeliveryCompanyDto.name,
          baseRate: new Decimal(createDeliveryCompanyDto.baseRate),
          ratePerKm: new Decimal(createDeliveryCompanyDto.ratePerKm),
          weightSurcharge: new Decimal(
            createDeliveryCompanyDto.weightSurcharge,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        deliveryCompanyMock.push(newDeliveryCompany);
        return 'Delivery company created successfully';
      },
    );
  updateDeliveryCompany = jest.fn();
}
