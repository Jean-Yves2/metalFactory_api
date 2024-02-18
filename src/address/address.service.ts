import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  // Inject your data service in the constructor
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAddresses(): Promise<Address[]> {
    // Logic to fetch all addresses from a data source
    return this.prismaService.address.findMany({ where: { deletedAt: null } });
  }

  async getAddressById(id: number): Promise<Address> {
    // Logic to fetch an address by its ID from a data source
    const address = await this.prismaService.address.findUnique({
      where: { id, deletedAt: null },
    });
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    return address;
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    // Logic to create a new address in a data source
    const { postalCode, ...rest } = createAddressDto;
    return this.prismaService.address.create({
      data: { postalCode, city: '', ...rest },
    });
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    // Logic to update an existing address in a data source
    return this.prismaService.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async softDelete(id: number): Promise<Address> {
    return this.prismaService.address.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
