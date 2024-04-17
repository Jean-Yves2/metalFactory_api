import { userMock } from './user.mock';
import { CreateUserDto } from '../dto/createUserdto';
import { userMockFromDelete } from './user.mock';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserServiceMock {
  getAllUsers = jest.fn().mockImplementation(() => {
    return userMock.map((user) => {
      return {
        ...user,
      };
    });
  });

  getUserById = jest.fn().mockImplementation((id: number) => {
    const foundUser = userMock.find((user) => user.id === id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  });

  updateUser = jest
    .fn()
    .mockImplementation((id: number, createUserDto: CreateUserDto) => {
      const userToUpdate = userMock.find((user) => user.id === id);

      if (!userToUpdate) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      const updatedUser = {
        ...userToUpdate,
        ...createUserDto,
      };

      if (createUserDto.address && createUserDto.address.type) {
        updatedUser.address.type = createUserDto.address.type;
      }

      return updatedUser;
    });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const userToDelete = userMockFromDelete.find((user) => user.id === id);

    if (!userToDelete) {
      return null;
    }

    return { ...userToDelete, deletedAt: new Date() };
  });
}
