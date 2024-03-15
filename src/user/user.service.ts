import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    if (!users) {
      throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
        deletedAt: null,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password, companyName, phone } =
      createUserDto;

    const createAddressDto = createUserDto.address;

    await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        companyName,
        userType: 'CUSTOMER', // default to customer
        addresses: {
          create: [
            {
              type: createAddressDto.type,
              address: {
                create: {
                  street: createAddressDto.street,
                  postalCode: createAddressDto.postalCode,
                  city: createAddressDto.city,
                  country: createAddressDto.country,
                  distanceToWarehouse: createAddressDto.distanceToWarehouse,
                },
              },
            },
          ],
        },
        phone,
      },
    });

    return 'User created successfully!';
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id, deletedAt: null },
    });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

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
      where: { id: id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return await this.prisma.user.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
