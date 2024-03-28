import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAddresses(): Promise<Address[]> {
    try {
      return await this.prismaService.address.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting all addresses');
    }
  }

  async getAddressById(id: number): Promise<Address> {
    try {
      const address = await this.prismaService.address.findUnique({
        where: { id, deletedAt: null },
      });
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      return address;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting address with id ${id}`,
      );
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const { postalCode, ...rest } = createAddressDto;
      return await this.prismaService.address.create({
        data: { postalCode, city: '', ...rest },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating address');
    }
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    try {
      return await this.prismaService.address.update({
        where: { id },
        data: updateAddressDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating address with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<Address> {
    try {
      return await this.prismaService.address.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting address with id ${id}`,
      );
    }
  }
}
