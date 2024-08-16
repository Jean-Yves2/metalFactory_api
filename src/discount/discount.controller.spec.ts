import { Decimal } from '@prisma/client/runtime/library';
import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './discount.controller';
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { DiscountType } from '@prisma/client';

describe('DiscountController', () => {
  let controller: DiscountController;
  let service: DiscountService;

  beforeEach(async () => {
    const serviceMock = {
      getAllDiscounts: jest.fn(),
      getDiscountById: jest.fn(),
      createDiscount: jest.fn(),
      updateDiscount: jest.fn(),
      softDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [
        {
          provide: DiscountService,
          useValue: serviceMock,
        },
      ],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
    service = module.get<DiscountService>(DiscountService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should call getAllDiscounts', async () => {
    await controller.findAll();
    expect(service.getAllDiscounts).toHaveBeenCalled();
  });

  it('should call getDiscountById with correct id', async () => {
    await controller.findOne(1);
    expect(service.getDiscountById).toHaveBeenCalledWith(1);
  });

  it('should call createDiscount with correct dto', async () => {
    const dto: CreateDiscountDto = {
      description: 'description',
      discountPercent: new Decimal(10),
      validFrom: undefined,
      validTo: undefined,
      global: false,
      discountType: DiscountType.FALL,
    };
    await controller.create(dto);
    expect(service.createDiscount).toHaveBeenCalledWith(dto);
  });

  it('should call softDelete with correct id', async () => {
    await controller.remove(4);
    expect(service.softDelete).toHaveBeenCalledWith(4);
  });
});
