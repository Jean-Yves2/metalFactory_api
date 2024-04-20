import { Test, TestingModule } from '@nestjs/testing';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { AddressServiceMock } from './mocks/address.service.mock';
import { addressMock } from './mocks/address.mock';

describe('AddressController', () => {
  let controller: AddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressController],
      providers: [
        {
          provide: AddressService,
          useClass: AddressServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<AddressController>(AddressController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllAddresses', () => {
    it('should return all addresses', async () => {
      const result = await controller.findAll();
      const allAddresses = addressMock.filter(
        (address) => address.deletedAt === null,
      );
      expect(result).toEqual(allAddresses);
    });
  });

  describe('getAddressById', () => {
    it('should return an address by id', async () => {
      const id = 1;
      const result = await controller.findOne(id);
      const address = addressMock.find(
        (address) => address.id === id && address.deletedAt === null,
      );
      expect(result).toEqual(address);
    });
  });
});
