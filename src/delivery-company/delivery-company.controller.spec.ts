import { Test, TestingModule } from '@nestjs/testing';
import { DeliveryCompanyController } from './delivery-company.controller';
import { DeliveryCompanyService } from './delivery-company.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryCompanyServiceMock } from './mocks/delivery-company.service.mock';

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
});
