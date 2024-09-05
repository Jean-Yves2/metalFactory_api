import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateUserDto } from './dto/createUserdto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PasswordDto } from './dto/password.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async getAllUsers() {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          userType: true,
        },
      });
    } catch (error) {
      this.logger.error('Error fetching all users:', error);
      throw new InternalServerErrorException('Error fetching all users');
    }
  }

  async getUserById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id, deletedAt: null },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isProfessional: true,
        },
      });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error('Error fetching user:', error);
      throw new HttpException(
        'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyProfile(userId: number) {
    try {
      this.logger.log('Fetching user profile with id:', userId);
      const user = await this.prisma.user.findUnique({
        where: { id: userId, deletedAt: null },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
          isProfessional: true,
          phone: true,
          addresses: {
            select: {
              id: true,
              type: true,
              address: {
                select: {
                  street: true,
                  postalCode: true,
                  city: true,
                  country: true,
                  distanceToWarehouse: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        this.logger.log('User not found');
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      this.logger.log('User fetched:', user);
      return user;
    } catch (error) {
      this.logger.error('Error fetching user:', error);
      throw new HttpException(
        'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        companyName,
        phone,
        address: createAddressDto,
      } = createUserDto;

      const hashedPassword = await bcrypt.hash(
        password,
        await bcrypt.genSalt(10),
      );

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

      return { message: 'User created successfully!' };
    } catch (error) {
      this.logger.error('Error creating user:', error);
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new BadRequestException(
          `Email "${createUserDto.email}" is already in use.`,
        );
      }
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la création de l'utilisateur.",
      );
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
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

      if (dataToUpdate.password) {
        dataToUpdate.password = await bcrypt.hash(
          dataToUpdate.password,
          await bcrypt.genSalt(10),
        );
      }

      return await this.prisma.user.update({
        where: { id },
        data: { ...dataToUpdate, updatedAt: new Date() },
      });
    } catch (error) {
      this.logger.error('Error updating user:', error);
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la mise à jour de l'utilisateur.",
      );
    }
  }

  async softDelete(id: number) {
    try {
      const user = await this.prisma.user.findUnique({ where: { id } });
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return await this.prisma.user.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      this.logger.error('Error soft deleting user:', error);
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la suppression de l'utilisateur.",
      );
    }
  }

  async findUserByEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      this.logger.error('Error finding user by email:', error);
      throw new InternalServerErrorException(
        "Une erreur s'est produite lors de la recherche de l'utilisateur.",
      );
    }
  }
}
