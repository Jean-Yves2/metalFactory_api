import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './mocks/user.service.mock';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceMock } from './mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { userMock } from './mocks/user.mock';
import { HttpException } from '@nestjs/common';
import { CreateAddressDto } from '../address/dto/create-address.dto';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useClass: UserServiceMock },
        { provide: ConfigService, useValue: ConfigServiceMock },
        { provide: JwtService, useValue: JwtServiceMock },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      expect(await controller.getAllUsers()).toEqual(userMock);
    });
  });

  describe('getUserById', () => {
    it('should return a user with specific id', async () => {
      const id = 1;
      const user = userMock.find((user) => user.id === id);
      expect(await controller.getUserById(id)).toEqual(user);
    });

    it('should throw an HttpException if no user found', async () => {
      const id = 100;
      await expect(controller.getUserById(id)).rejects.toThrow(HttpException);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const id = 1;
      const updateUser = {
        firstName: 'John Silver 999',
        lastName: 'Doe',
        email: 'testing@testing.com',
        password: 'Password123*.comTTU',
        role: 'USER',
        userType: 'CUSTOMER',
        phone: '65156546568466565',
        isProfessional: false,
        siret: 'legal number is here',
        companyName: 'company name1 ',
        createdAt: new Date('2024-04-18T09:05:38.780Z'),
        updatedAt: new Date('2024-04-18T09:05:38.780Z'),
        deletedAt: null,
      };

      const createAddressDto: CreateAddressDto = {
        addressId: 1,
        street: '',
        country: '',
      };
      await expect(
        controller.updateUser(id, { ...updateUser, address: createAddressDto }),
      ).resolves.toEqual('User updated successfully');
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user', async () => {
      const result = await controller.remove(1);
      expect(result).toBeDefined();
    });
  });
});
