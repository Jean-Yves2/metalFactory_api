import { validateOrReject } from 'class-validator';
import { PasswordDto } from '../dto/password.dto';
import { userMock } from './user.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

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

  createUser = jest.fn().mockImplementation((createUserDto) => {
    const passwordDto = new PasswordDto();
    passwordDto.password = createUserDto.password;
    validateOrReject(passwordDto);
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(passwordDto.password, salt);
    createUserDto.password = hashedPassword;
    const newUser = {
      id: userMock.length + 1,
      ...createUserDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
    userMock.push(newUser);
    return newUser;
  });

  updateUser = jest.fn().mockImplementation((id: number, createUserDto) => {
    const userToUpdate = userMock.find(
      (user) => user.id === id && user.deletedAt === null,
    );
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = {
      ...userToUpdate,
      ...createUserDto,
      updatedAt: new Date(),
    };
    userMock[userMock.indexOf(userToUpdate)] = updatedUser;
    return 'User updated successfully';
  });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const userToDelete = userMock.find((user) => user.id === id);

    if (!userToDelete) {
      return null;
    }

    return { ...userToDelete, deletedAt: new Date() };
  });
}
