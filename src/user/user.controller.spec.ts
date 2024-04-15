import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './mocks/user.service.mock';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceMock } from './mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { userMock } from './mocks/user.mock';
import { CreateUserDto } from './dto/createUserdto';
import { HttpException } from '@nestjs/common';

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

  it('should return an array of users', async () => {
    expect(await controller.getAllUsers()).toEqual(userMock);
  });

  it('should return a user with specific id', async () => {
    const id = 1;
    const user = userMock.find((user) => user.id === id);
    expect(await controller.getUserById(id)).toEqual(user);
  });

  it('should throw an HttpException if no user found', async () => {
    const id = 100;
    await expect(controller.getUserById(id)).rejects.toThrow(HttpException);
  });

  it('should update a user with specific id', async () => {
    const id = 1;
    const createUserDto: CreateUserDto = {
      firstName: 'Michael',
      lastName: 'Smith deckard',
      email: 'm.smith@example.com',
      password: 'SecurePass123!',
      companyName: 'Smith & Co.',
      address: {
        street: '456 Maple Avenue',
        postalCode: '54321',
        city: 'Mapletown',
        country: 'United States',
        distanceToWarehouse: 20,
        type: 'DELIVERY',
      },
      phone: '987-654-3210',
    };

    const userToUpdate = userMock.find((user) => user.id === id);

    if (!userToUpdate) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = {
      ...userToUpdate,
      ...createUserDto,
      address: {
        ...userToUpdate.address,
        ...createUserDto.address,
      },
    };

    if (createUserDto.address && createUserDto.address.type) {
      updatedUser.address.type = createUserDto.address.type;
    }

    expect(await controller.updateUser(id, createUserDto)).toEqual(updatedUser);
  });

  it('should throw an HttpException if no user found', async () => {
    const id = 100;
    const createUserDto: CreateUserDto = {
      firstName: 'Michael',
      lastName: 'Smith deckard',
      email: 'm.smith@example.com',
      password: 'SecurePass123!',
      companyName: 'Smith & Co.',
      address: {
        street: '456 Maple Avenue',
        postalCode: '54321',
        city: 'Mapletown',
        country: 'United States',
        distanceToWarehouse: 20,
        type: 'DELIVERY',
      },
      phone: '987-654-3210',
    };
    expect(controller.updateUser(id, createUserDto)).rejects.toThrow(
      HttpException,
    );
  });

  it('should remove a user with specific id', async () => {
    const id = 4;
    const deletedUser = await controller.remove(id);
    expect(deletedUser).toEqual({
      id: 4,
      deletedAt: expect.any(Date), // Verification that deletedAt is an instance of Date
      email: expect.any(String),
      password: expect.any(String),
      role: expect.any(String),
      userType: expect.any(String),
      firstName: expect.any(String),
      lastName: expect.any(String),
      phone: expect.any(String),
      isProfessional: expect.any(Boolean),
      siret: expect.any(String),
      companyName: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });
});
