import { Test, TestingModule } from '@nestjs/testing';
import { DiscountService } from './discount.service';
import { PrismaService } from '../database/prisma/prisma.service';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { DiscountType } from '@prisma/client';

describe('DiscountService', () => {
  let service: DiscountService;
  let discounts;
  let discount;
  let createDiscountDto;

  const prismaServiceMock = {
    discount: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    discounts = [{ id: 1 }, { id: 2 }];
    discount = { id: 1 };
    createDiscountDto = {
      description: 'Sample description',
      discountPercent: 10,
      validFrom: new Date(),
      validTo: new Date(),
      global: false,
      discountType: DiscountType.PROFESSIONAL,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscountService,
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<DiscountService>(DiscountService);
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllDiscounts', () => {
    it('should return an array of all discounts', async () => {
      prismaServiceMock.discount.findMany.mockResolvedValue(discounts);
      expect(await service.getAllDiscounts()).toEqual(discounts);
      expect(prismaServiceMock.discount.findMany).toHaveBeenCalledWith({
        where: {
          deletedAt: null,
        },
      });
    });

    it('should throw an InternalServerErrorException if there is a problem with fetching discounts', async () => {
      prismaServiceMock.discount.findMany.mockRejectedValue(new Error());
      await expect(service.getAllDiscounts()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getDiscountById', () => {
    it('should return a discount by ID', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(discount);
      expect(await service.getDiscountById(1)).toEqual(discount);
      expect(prismaServiceMock.discount.findUnique).toHaveBeenCalledWith({
        where: {
          id: 1,
          deletedAt: null,
        },
      });
    });

    it('should throw a NotFoundException if discount is not found', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(null);
      await expect(service.getDiscountById(1)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw an InternalServerErrorException if there is a problem with fetching discount', async () => {
      prismaServiceMock.discount.findUnique.mockRejectedValue(new Error());
      await expect(service.getDiscountById(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createDiscount', () => {
    it('should create a discount', async () => {
      prismaServiceMock.discount.create.mockResolvedValue(discount);
      expect(await service.createDiscount(createDiscountDto)).toEqual(discount);
      expect(prismaServiceMock.discount.create).toHaveBeenCalledWith({
        data: {
          ...createDiscountDto,
          createdAt: expect.any(Date),
          quotes: { create: createDiscountDto.quotes },
        },
      });
    });

    it('should throw an InternalServerErrorException if there is a problem with creating discount', async () => {
      prismaServiceMock.discount.create.mockRejectedValue(new Error());
      await expect(service.createDiscount(createDiscountDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('updateDiscount', () => {
    it('should update a discount', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(discount);
      prismaServiceMock.discount.update.mockResolvedValue(discount);
      expect(await service.updateDiscount(1, createDiscountDto)).toEqual(
        discount,
      );
      expect(prismaServiceMock.discount.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          ...createDiscountDto,
          updatedAt: expect.any(Date),
          quotes: { updateMany: { where: { discountId: 1 }, data: undefined } },
        },
      });
    });

    it('should throw a NotFoundException if discount is not found', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(null);
      await expect(
        service.updateDiscount(1, createDiscountDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException if there is a problem with updating discount', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue({ id: 1 });
      prismaServiceMock.discount.update.mockRejectedValue(new Error());
      await expect(
        service.updateDiscount(1, createDiscountDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('softDelete', () => {
    it('should soft delete a discount', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(discount);
      prismaServiceMock.discount.update.mockResolvedValue(discount);
      expect(await service.softDelete(1)).toEqual(discount);
      expect(prismaServiceMock.discount.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {
          deletedAt: expect.any(Date),
        },
      });
    });

    it('should throw a NotFoundException if discount is not found', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue(null);
      await expect(service.softDelete(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw an InternalServerErrorException if there is a problem with soft deleting discount', async () => {
      prismaServiceMock.discount.findUnique.mockResolvedValue({ id: 1 });
      prismaServiceMock.discount.update.mockRejectedValue(new Error());
      await expect(service.softDelete(1)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
