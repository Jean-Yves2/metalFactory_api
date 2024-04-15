import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { UserPrismaMock } from './mocks/user.prisma.mock';
import { HttpException } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserType } from '@prisma/client';
import { userMock } from './mocks/user.mock';
import { CreateUserDto } from './dto/createUserdto';
import { userMockForCreate } from './mocks/user.mock';
import { JwtServiceMock } from './mocks/jwt.service.mock';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceMock } from './mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
describe('UserService', () => {
  let service: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useClass: UserPrismaMock,
        },
        { provide: ConfigService, useValue: ConfigServiceMock },
        { provide: JwtService, useValue: JwtServiceMock },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [
        {
          id: 1,
          email: 'Arnold.Wolff@gmail.com',
          password: 'v6SD601PbSoBNx0',
          role: UserRole.USER,
          userType: UserType.CUSTOMER,
          firstName: 'Donald',
          lastName: 'Stark',
          phone: '538.933.1914 x9356',
          isProfessional: false,
          siret: 'null',
          companyName: 'ABCaaa Company',
          createdAt: new Date('2024-04-09T09:38:15.000Z'),
          updatedAt: new Date('2024-04-09T09:38:15.000Z'),
          deletedAt: new Date('2024-04-09T09:38:15.000Z'),
        },
      ];
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValueOnce([
        {
          id: 1,
          email: 'Arnold.Wolff@gmail.com',
          password: 'v6SD601PbSoBNx0',
          role: UserRole.USER,
          userType: UserType.CUSTOMER,
          firstName: 'Donald',
          lastName: 'Stark',
          phone: '538.933.1914 x9356',
          isProfessional: false,
          siret: 'null',
          companyName: 'ABCaaa Company',
          createdAt: new Date('2024-04-09T09:38:15.000Z'), // create static date
          updatedAt: new Date('2024-04-09T09:38:15.000Z'),
          deletedAt: new Date('2024-04-09T09:38:15.000Z'),
        },
      ]);

      const result = await service.getAllUsers();
      expect(result).toEqual(mockUsers);
    });

    it('should throw an HttpException if no users found', async () => {
      jest.spyOn(prismaService.user, 'findMany').mockResolvedValueOnce(null); // Test not returning any users

      await expect(service.getAllUsers()).rejects.toThrow(HttpException);
    });
  });
  describe('getUserById', () => {
    it('should return a user by id', async () => {
      const userSearch = userMock.find((user) => user.id === 1); // Find user with id 1 from mock data (user.mock.ts)
      const result = await service.getUserById(1);
      expect(result).toEqual(userSearch);
    });

    it('should throw an HttpException if no user found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.getUserById(8)).rejects.toThrow(HttpException);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newUser: CreateUserDto = userMockForCreate;

      expect(newUser.address).toBeDefined();
      await service.createUser(newUser);
      await expect(service.createUser(newUser)).resolves.toEqual(
        'User created successfully!',
      );
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          password: expect.any(String),
          companyName: newUser.companyName,
          userType: 'CUSTOMER',
          addresses: {
            create: [
              {
                type: newUser.address.type,
                address: {
                  create: {
                    street: newUser.address.street,
                    postalCode: newUser.address.postalCode,
                    city: newUser.address.city,
                    country: newUser.address.country,
                    distanceToWarehouse: newUser.address.distanceToWarehouse,
                  },
                },
              },
            ],
          },
          phone: newUser.phone,
        },
      });
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const userSearch = userMock.find((user) => user.id === 1);
      userSearch.firstName = 'John';
      const updatedUser = await service.updateUser(1, userSearch);
      expect(updatedUser).toEqual(userSearch);
    });
    it('should throw an HttpException if no user found', async () => {
      jest.spyOn(prismaService.user, 'update').mockResolvedValueOnce(null);
      const userSearch = userMock.find((user) => user.id === 1);

      await expect(service.updateUser(8, userSearch)).rejects.toThrow(
        HttpException,
      );
    });
  });
});
