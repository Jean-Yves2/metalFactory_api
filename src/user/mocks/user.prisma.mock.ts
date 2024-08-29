import { User, UserRole, UserType } from '@prisma/client';
import { userMock } from './user.mock';
import { NotFoundException } from '@nestjs/common';
export class UserPrismaMock {
  user = {
    findMany: jest.fn().mockImplementation(() => {
      const allUsers = userMock.filter((user) => user.deletedAt === null);
      return allUsers;
    }),
    findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
      const user = userMock.find(
        (user) => user.id === id && user.deletedAt === null,
      );
      if (user === undefined) {
        throw new NotFoundException('Utilisateur introuvable.');
      }
      return user;
    }),
    create: jest.fn().mockImplementation((createUserDto) => {
      const newUser: User = {
        id: userMock.length + 1,
        email: createUserDto.data.email,
        password: createUserDto.data.password, //createUserDto.data.password,
        role: UserRole.USER,
        userType: UserType.CUSTOMER,
        firstName: createUserDto.data.firstName,
        lastName: createUserDto.data.lastName,
        phone: '',
        isProfessional: false,
        siret: '',
        companyName: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };

      userMock.push(newUser);
      return newUser;
    }),
    update: jest.fn().mockImplementation((id, updateUserDto) => {
      const updatedUser = { ...id, ...updateUserDto };
      userMock[userMock.indexOf(id)] = updatedUser;
      return 'User updated successfully!';
    }),
  };
}
