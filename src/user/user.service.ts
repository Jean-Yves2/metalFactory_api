import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserdto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return users;
  }

  async getUserById(id: string) {
    const userId = parseInt(id, 10);
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    return user;
  }

  // ⚠️ La creation d'un utilisateur n'est pas encore implementée
  // ⚠️ Car elle nécéssite l'implémentaion de l'addresse de l'utilisateur
  // ⚠️ et la gestion des roles
  async createUser(data: CreateUserDto) {
    return data;
  }

  async updateUser(
    id: number | string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    id = typeof id === 'string' ? parseInt(id, 10) : id;

    const existingUser = await this.prisma.user.findUnique({
      where: { id },
    });

    const dataToUpdate = {} as UpdateUserDto;
    for (const key in updateUserDto) {
      if (
        updateUserDto.hasOwnProperty(key) &&
        updateUserDto[key] !== existingUser[key]
      ) {
        dataToUpdate[key] = updateUserDto[key];
      }
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...dataToUpdate,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
