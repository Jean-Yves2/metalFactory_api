import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { UserPrismaMock } from './mocks/user.prisma.mock';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { userMock } from './mocks/user.mock';
import { CreateUserDto } from './dto/createUserdto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useClass: UserPrismaMock,
        },
        ConfigService,
        JwtService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should return an array of users', async () => {
      const result = await service.getAllUsers();
      const activeUsers = userMock.filter((user) => user.deletedAt === null);
      expect(result).toEqual(activeUsers);
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prisma'].user, 'findMany')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getAllUsers();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          'InternalServerErrorException: Error fetching all users',
        );
      }
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      const result = await service.getUserById(1);
      expect(result).toEqual(userMock.find((user) => user.id === 1));
    });

    it('should throw an error when the user is not found', async () => {
      const id = 99;
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);
      try {
        await service.getUserById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          'HttpException: Error fetching user',
        );
      }
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const newUser: CreateUserDto = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@example.com',
        password: 'Abc123@!XYZabc',
        phone: '555666777',
        companyName: 'Johnson Enterprises',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          country: '',
        },
      };
      const result = await service.createUser(newUser);
      expect(result.message).toEqual('User created successfully!');
    });

    it('should throw BadRequestException if error is BadRequestException', async () => {
      const newUser: CreateUserDto = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@example.com',
        password: 'Abc123@!XYZabc',
        phone: '555666777',
        companyName: 'Johnson Enterprises',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          country: '',
        },
      };
      jest
        .spyOn(service['prisma'].user, 'create')
        .mockRejectedValueOnce(new BadRequestException());

      await expect(service.createUser(newUser)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException when an unexpected error occurs', async () => {
      const createUserMock = jest
        .spyOn(service['prisma'].user, 'create')
        .mockRejectedValueOnce(new Error());

      const createUserDto: CreateUserDto = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@example.com',
        password: 'Abc123@!XYZabc',
        phone: '555666777',
        companyName: 'Johnson Enterprises',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          country: '',
        },
      };

      try {
        await service.createUser(createUserDto);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
      expect(createUserMock).toBeCalledTimes(1);
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const updatedUser: CreateUserDto = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@example.com',
        password: 'Abc123@!XYZabc',
        phone: '555666777',
        companyName: 'Johnson Enterprises',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          country: '',
        },
      };
      const result = await service.updateUser(1, updatedUser);
      expect(result).toEqual('User updated successfully!');
    });
    it('should throw an error when the user is not found', async () => {
      const id = 99;
      const updatedUser: CreateUserDto = {
        firstName: 'Emily',
        lastName: 'Johnson',
        email: 'emily@example.com',
        password: 'Abc123@!XYZabc',
        phone: '555666777',
        companyName: 'Johnson Enterprises',
        address: {
          street: '123 Main St',
          city: 'Springfield',
          country: '',
        },
      };
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);
      try {
        await service.updateUser(id, updatedUser);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain('HttpException: User not found');
      }
    });
  });

  describe('softDelete', () => {
    it('should soft delete a user', async () => {
      const result = await service.softDelete(1);
      expect(result).toEqual('User updated successfully!');
    });

    it('should throw an error when the user is not found', async () => {
      const id = 99;
      jest.spyOn(service['prisma'].user, 'findUnique').mockResolvedValue(null);
      try {
        await service.softDelete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          "InternalServerErrorException: Une erreur s'est produite lors de la suppression de l'utilisateur.",
        );
      }
    });
  });
});
