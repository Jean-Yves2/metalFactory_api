import { NotFoundException } from '@nestjs/common';
import { addressMock } from './address.mock';
import { CreateAddressDto } from '../dto/create-address.dto';

export class PrismaServiceMock {
  address = {
    findMany: jest.fn().mockImplementation(() => {
      const allAddresses = addressMock.filter(
        (address) => address.deletedAt === null,
      );
      return allAddresses;
    }),

    findUnique: jest.fn().mockImplementation(({ where: { id } }: any) => {
      try {
        const address = addressMock.find(
          (address) => address.id === id && address.deletedAt === null,
        );
        if (!address) {
          throw new NotFoundException(`Address with ID ${id} not found`);
        }
        return address;
      } catch (error) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
    }),
    create: jest
      .fn()
      .mockImplementation((createAddressDto: CreateAddressDto) => {
        const newAddress = {
          id: addressMock.length + 1,
          street: createAddressDto.street,
          postalCode: createAddressDto.postalCode,
          city: createAddressDto.city,
          country: createAddressDto.country,
          distanceToWarehouse: createAddressDto.distanceToWarehouse,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        return newAddress; // Return the created address object
      }),
    update: jest.fn().mockImplementation(({ where: { id }, data }: any) => {
      const address = addressMock.find((address) => address.id === id);
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      const updatedAddress = {
        ...address,
        ...data,
        updatedAt: new Date(),
      };
      return updatedAddress;
    }),
  };
}
