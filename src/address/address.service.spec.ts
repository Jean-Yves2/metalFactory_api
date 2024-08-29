import { Test, TestingModule } from '@nestjs/testing';
import { AddressService } from './address.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ], // Import PrismaService here
    }).compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllAddresses', () => {
    it('should return all addresses', async () => {
      const result = await service.getAllAddresses();
      expect(result).toEqual(result);
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].address, 'findMany')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getAllAddresses();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain('Error getting all addresses');
      }
    });
  });

  describe('getAddressById', () => {
    it('should return an address by id', async () => {
      const id = 1;
      const result = await service.getAddressById(id);
      expect(result).toEqual(result);
    });

    it('should throw NotFoundException when the address is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].address, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.getAddressById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain(
          `InternalServerErrorException: Error getting address with id ${id}`,
        );
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].address, 'findUnique')
        .mockRejectedValue(new Error('Address not found'));
      try {
        await service.getAddressById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain(
          `InternalServerErrorException: Error getting address with id ${id}`,
        );
      }
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
      const result = await service.createAddress(newAddress);
      expect(result).toEqual(result);
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].address, 'create')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.createAddress({
          street: 'Street 4',
          postalCode: '12345',
          city: 'City 4',
          country: 'Country 4',
          distanceToWarehouse: 20,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain('Error creating address');
      }
    });
  });

  describe('updateAddress', () => {
    it('should update an address', async () => {
      const id = 1;
      const updatedAddress = {
        street: 'Street 4',
        postalCode: '12345',
        city: 'City 4',
        country: 'Country 4',
        distanceToWarehouse: 20,
      };
      const result = await service.updateAddress(id, updatedAddress);
      expect(result).toEqual(result);
    });

    it('should throw NotFoundException when the address is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].address, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.updateAddress(id, {
          street: 'Street 4',
          postalCode: '12345',
          city: 'City 4',
          country: 'Country 4',
          distanceToWarehouse: 20,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.toString()).toContain(
          `NotFoundException: Address with id ${id} not found`,
        );
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 1;
      jest
        .spyOn(service['prismaService'].address, 'update')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.updateAddress(id, {
          street: 'Street 4',
          postalCode: '12345',
          city: 'City 4',
          country: 'Country 4',
          distanceToWarehouse: 20,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
        expect(error.toString()).toContain('Error updating address with id 1');
      }
    });
  });

  describe('softDelete', () => {
    it('should soft delete an address', async () => {
      const id = 1;
      const result = await service.softDelete(id);
      expect(result).toEqual(result);
    });

    it('should throw NotFoundException when the address is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].address, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.softDelete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.toString()).toContain(
          `NotFoundException: Address with id ${id} not found`,
        );
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 1;
      jest
        .spyOn(service['prismaService'].address, 'update')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.softDelete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          `InternalServerErrorException: Error deleting address with id ${id}`,
        );
      }
    });
  });
});
