import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyController } from './delivery-company.controller';

describe('DeliveryCompanyController', () => {
  let controller: DeliveryCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeliveryCompanyController],
    }).compile();

    controller = module.get<DeliveryCompanyController>(DeliveryCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
