import { userMock } from './user.mock';
import { CreateUserDto } from '../dto/createUserdto';
import { userMockFromDelete } from './user.mock';

export class UserServiceMock {
  getAllUsers = jest.fn().mockImplementation(() => {
    return userMock.map((user) => {
      return {
        ...user,
      };
    });
  });

  getUserById = jest.fn().mockImplementation((id: number) => {
    return userMock.find((user) => user.id === id);
  });

  updateUser = jest
    .fn()
    .mockImplementation((id: number, createUserDto: CreateUserDto) => {
      const userToUpdate = userMock.find((user) => user.id === id);

      if (!userToUpdate) {
        return null;
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
