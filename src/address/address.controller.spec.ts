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

  describe('createAddress', () => {
    it('should create an address', async () => {
      const newAddress = {
        street: 'Street 4',
        postalCode: '12345',
        city: 'City 4',
        country: 'Country 4',
        distanceToWarehouse: 20,
      };
      const result = await controller.create(newAddress);
      expect(result).toEqual(newAddress);
    });
  });

  describe('updateAddress', () => {
    it('should update an address', async () => {
      const id = 1;
      const updatedAddress = {
        street: 'Street 1 Updated',
        postalCode: '12345',
        city: 'City 1 Updated 999',
        country: 'Country 1 Updated',
        distanceToWarehouse: 30,
      };
      const result = await controller.update(id, updatedAddress);
      expect(result).toEqual(updatedAddress);
    });
  });

  describe('deleteAddress', () => {
    it('should delete an address', async () => {
      const id = 1;
      const result = await controller.remove(id);
      expect(result).toEqual({
        id: id,
        deletedAt: expect.any(Date),
        city: 'City 1',
        country: 'Country 1',
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        distanceToWarehouse: expect.any(Object), //* ⚠️we need to check the type ⚠️ **/
        postalCode: '12345',
        street: 'Street 1',
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
      });
    });
  });
});
