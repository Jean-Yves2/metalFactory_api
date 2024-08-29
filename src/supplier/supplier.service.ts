import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier } from '@prisma/client';

@Injectable()
export class SupplierService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllSuppliers(): Promise<Supplier[]> {
    return this.prismaService.supplier.findMany();
  }

  async getSupplierById(id: number) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!supplier) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    return supplier;
  }

  async createSupplier(createSupplierDto: CreateSupplierDto) {
    await this.prismaService.supplier.create({
      data: {
        name: createSupplierDto.name,
        SIRET: createSupplierDto.SIRET,
        address: {
          create: {
            street: createSupplierDto.address.street,
            city: createSupplierDto.address.city,
            postalCode: createSupplierDto.address.postalCode,
            country: createSupplierDto.address.country,
          },
        },
        contactEmail: createSupplierDto.contactEmail,
        contactPhone: createSupplierDto.contactPhone,
      },
    });
    return 'Supplier created successfully';
  }

  async updateSupplier(id: number, createSupplierDto: CreateSupplierDto) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!supplier) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.supplier.update({
      where: { id: id },
      data: {
        name: createSupplierDto.name,
        SIRET: createSupplierDto.SIRET,
        address: {
          update: {
            street: createSupplierDto.address.street,
            city: createSupplierDto.address.city,
            postalCode: createSupplierDto.address.postalCode,
            country: createSupplierDto.address.country,
          },
        },
        contactEmail: createSupplierDto.contactEmail,
        contactPhone: createSupplierDto.contactPhone,
      },
    });
    return 'Supplier updated successfully';
  }

  async softeDeleteSupplier(id: number) {
    const supplier = await this.prismaService.supplier.findUnique({
      where: { id: id, deletedAt: null },
    });

    if (!supplier) {
      throw new HttpException('Supplier not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.supplier.update({
      where: { id: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Supplier deleted successfully';
  }
}
