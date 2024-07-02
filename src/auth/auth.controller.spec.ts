import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { AuthServiceMock } from './mocks/auth.service.mock';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        JwtService,
        ConfigService,
        { provide: AuthService, useClass: AuthServiceMock },
        UserService,
        PrismaService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('login', () => {
  //   it('should return an access token', async () => {
  //     const result = await controller.login({
  //       email: 'jogdfhkjhkfgf12dlmMhngfv1.doe@example.com',
  //       password: 'baltazar111111*B111111122',
  //     });
  //     expect(result).toBeDefined();
  //   });
  // });

  describe('register', () => {
    it('should return an access token', async () => {
      const result = await controller.register({
        firstName: 'bal2e',
        lastName: 'Dfgdfgjgffgkhdgoee',
        email: 'jogdfhkjhkfgf12dlmMhengfv1.doe@example.com',
        password: 'baltazar111111*B11e1111122',
        companyName: 'Exampfhlegd Companye',
        address: {
          street: '123 Maihgfggdn St',
          postalCode: '1233166654415',
          city: 'Exampdhgjgfgfle City',
          country: 'Examplfggjde Country',
          distanceToWarehouse: 10,
          type: 'DELIVERY',
        },
        phone: '123456544568554705455214890',
      });
      expect(result).toBeDefined();
    });
  });

  // describe('profile', () => {
  //   it('should return the current user', async () => {
  //     const mockUser = {
  //       email: 'jogdfhkjhkf2dlmMhengfv1.doe@example.com',
  //       sub: 15,
  //       role: 'USER',
  //       iat: 1714381554,
  //       exp: 1714385154,
  //     };
  //     const req = { user: mockUser };
  //     const result = await controller.profile(req);
  //     expect(result).toEqual(mockUser);
  //   });
  // });
});
