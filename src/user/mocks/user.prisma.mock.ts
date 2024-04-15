import { CreateAddressDto } from '../../address/dto/create-address.dto';
import { userMock, userMockForCreate } from './user.mock';
import { CreateUserDto } from '../dto/createUserdto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserPrismaMock {
  user = {
    findMany: jest.fn().mockImplementation(() => {
      return userMock.map((user) => {
        return {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
      });
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const foundUser = userMock.find((user) => user.id === params.where.id);
      if (!foundUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return foundUser;
    }),
    create: jest.fn().mockImplementation(() => {
      const data: CreateUserDto = userMockForCreate;
      console.log('data', data);
      const address: CreateAddressDto = {
        street: '123 Maihgfggdn St',
        postalCode: '1233166654415',
        city: 'Exampdhgjgfgfle City',
        country: 'Examplfggjde Country',
        distanceToWarehouse: 10,
        type: 'DELIVERY',
      };

      const newUser = {
        id: userMock.length + 1,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        companyName: data.companyName,
        phone: data.phone,
        address: {
          street: address.street,
          postalCode: address.postalCode,
          city: address.city,
          country: address.country,
          distanceToWarehouse: address.distanceToWarehouse,
          type: address.type,
        },
      };

      userMock.push({
        ...newUser,
        address: {
          ...newUser.address,
          type: 'DELIVERY',
        },
      });
      return 'User created successfully!';
    }),

    update: jest.fn().mockImplementation((params) => {
      const existingUser = userMock.find((user) => user.id === params.where.id);
      if (!existingUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return existingUser;
    }),
  };
}
