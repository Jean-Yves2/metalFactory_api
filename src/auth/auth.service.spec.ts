import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma/prisma.service';
//import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserdto';
import { userMock } from '../user/mocks/user.mock';
import { User, UserRole, UserType } from '@prisma/client';

describe('AuthService', () => {
  let service: AuthService;
  let userServiceMock: Partial<UserService>;
  let jwtServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      findUserByEmail: jest.fn(),
      createUser: jest.fn().mockImplementation((createUserDto) => {
        const newUser: User = {
          id: userMock.length + 1,
          email: createUserDto.email,
          password: createUserDto.password,
          role: UserRole.USER,
          userType: UserType.CUSTOMER,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          phone: '',
          isProfessional: false,
          siret: '',
          companyName: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };

        userMock.push(newUser);
        return 'User created successfully!';
      }),
    };
    jwtServiceMock = {
      signAsync: jest.fn().mockImplementation(() => 'mockedAccessToken'),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
        PrismaService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return an access token with valid credentials', async () => {
  //     const email = 'test@example.com';
  //     const password = 'mGk&DY?xfS6tEhMkTEx';
  //     const user = {
  //       id: 1,
  //       email,
  //       password:
  //         '$2b$10$/JX7NQNzCo0mjYMo0TvtY.YPEDe9Ew02R8Pa94/yi9.eFA7BmwDSO',
  //     };

  //     (userServiceMock.findUserByEmail as jest.Mock).mockResolvedValue(user);

  //     const result = await service.validateUser(email, password);
  //     expect(result).toBeDefined();
  //   });

  //   it('should throw UnauthorizedException with invalid password', async () => {
  //     const email = 'test@example.com';
  //     const password = 'wrongpassword';
  //     const user = {
  //       id: 1,
  //       email,
  //       password: '$2b$10$12sJwrFOPI7mMmM.aTmMz.wM6X6xqxyEyRNE2HMR28gA7',
  //     };

  //     (userServiceMock.findUserByEmail as jest.Mock).mockResolvedValue(user);

  //     await expect(service.validateUser(email, password)).rejects.toThrow(
  //       UnauthorizedException,
  //     );
  //   });

  //   it('should throw UnauthorizedException with invalid email', async () => {
  //     const email = 'nonexistent@example.com';
  //     const password = 'password';

  //     userServiceMock.findUserByEmail = jest.fn().mockResolvedValue(null);

  //     await expect(service.validateUser(email, password)).rejects.toThrow(
  //       UnauthorizedException,
  //     );
  //   });

  //   it('should return an access token with valid credentials', async () => {
  //     const email = 'test@example.com';
  //     const password = 'Abc123@!XYZabc';
  //     const user = {
  //       id: 1,
  //       email,
  //       password:
  //         '$2b$10$/JX7NQNzCo0mjYMo0TvtY.YPEDe9Ew02R8Pa94/yi9.eFA7BmwDSO',
  //       role: 'USER',
  //     };

  //     (userServiceMock.findUserByEmail as jest.Mock).mockResolvedValue(user);
  //     jwtServiceMock.signAsync.mockResolvedValue('mockedAccessToken');

  //     const result = await service.validateUser(email, password);

  //     //expect(result.access_token).toEqual('mockedAccessToken');
  //     expect(jwtServiceMock.signAsync).toHaveBeenCalledWith({
  //       email: user.email,
  //       sub: user.id,
  //       role: user.role,
  //     });
  //   });
  // });

  describe('register', () => {
    it('should return an access token with valid credentials', async () => {
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

      const result = await service.register(newUser);
      expect(result).toBeDefined();
    });
  });
});
