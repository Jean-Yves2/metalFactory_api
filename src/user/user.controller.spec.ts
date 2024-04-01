import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserServiceMock } from './mocks/user.service.mock';
import { ConfigService } from '@nestjs/config';
import { ConfigServiceMock } from './mocks/config.service.mock';
import { JwtService } from '@nestjs/jwt';
import { JwtServiceMock } from './mocks/jwt.service.mock';

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
});
