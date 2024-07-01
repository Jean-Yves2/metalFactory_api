import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserdto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PasswordDto } from './dto/password.dto';
import { validateOrReject } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(UserService.name);

  async getAllUsers() {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all users');
    }
  }

  async getUserById(id: number) {
    try {
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
    } catch (error) {
      throw new HttpException(
        'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { firstName, lastName, email, password, companyName, phone } =
        createUserDto;

      const passwordDto = new PasswordDto();
      passwordDto.password = password;

      await validateOrReject(passwordDto);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const createAddressDto = createUserDto.address;

      await this.prisma.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: hashedPassword,
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

      return {
        message: 'User created successfully!',
      };
    } catch (error) {
      console.log('Erreur du serveur : ', error);

      this.logger.error('Error creating user:', error);

      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Email "${createUserDto.email}" is already in use.`,
        );
      }
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          "Une erreur s'est produite lors de la création de l'utilisateur.",
        );
      }
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: { id: id, deletedAt: null },
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

      if (dataToUpdate.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(dataToUpdate.password, salt);
        dataToUpdate.password = hashedPassword;
      }

      return await this.prisma.user.update({
        where: { id },
        data: {
          ...dataToUpdate,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(
          "Une erreur s'est produite lors de la création de l'utilisateur.",
        );
      } else {
        throw error;
      }
    }
  }

  async softDelete(id: number) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la suppression de l'utilisateur.",
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la recherche de l'utilisateur.",
      );
    }
  }
}
