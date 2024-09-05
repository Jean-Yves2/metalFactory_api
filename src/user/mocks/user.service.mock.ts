import { validateOrReject } from 'class-validator';
import { PasswordDto } from '../dto/password.dto';
import { userMock } from './user.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

export class UserServiceMock {
  getAllUsers = jest.fn().mockImplementation(() => userMock);

  getUserById = jest.fn().mockImplementation((id: number) => {
    const foundUser = userMock.find((user) => user.id === id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return foundUser;
  });

  createUser = jest.fn().mockImplementation(async (createUserDto) => {
    const passwordDto = new PasswordDto();
    passwordDto.password = createUserDto.password;
    await validateOrReject(passwordDto);
    const salt = await bcrypt.genSalt(10);
    createUserDto.password = await bcrypt.hash(passwordDto.password, salt);
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
    Object.assign(userToUpdate, createUserDto, { updatedAt: new Date() });
    return 'User updated successfully';
  });

  softDelete = jest.fn().mockImplementation((id: number) => {
    const userToDelete = userMock.find((user) => user.id === id);
    if (!userToDelete) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    userToDelete.deletedAt = new Date();
    return userToDelete;
  });
}
