import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeliveryCompanyDto } from './dto/create-delivery-company.dto';
import { UpdateDeliveryCompanyDto } from './dto/update-delivery-company.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryCompany } from '@prisma/client';

@Injectable()
export class DeliveryCompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDeliveryCompanies(): Promise<DeliveryCompany[]> {
    return this.prismaService.deliveryCompany.findMany({
      where: { deletedAt: null },
    });
  }

  async getDeliveryCompanyById(id: number): Promise<DeliveryCompany> {
    const deliveryCompany = await this.prismaService.deliveryCompany.findUnique(
      {
        where: { id, deletedAt: null },
      },
    );
    if (!deliveryCompany) {
      throw new NotFoundException(`Delivery company with ID ${id} not found`);
    }
    return deliveryCompany;
  }

  async createDeliveryCompany(
    createDeliveryCompanyDto: CreateDeliveryCompanyDto,
  ): Promise<DeliveryCompany> {
    return this.prismaService.deliveryCompany.create({
      data: {
        ...createDeliveryCompanyDto,
        createdAt: new Date(),
      },
    });
  }

  async updateDeliveryCompany(
    id: number,
    updateDeliveryCompanyDto: UpdateDeliveryCompanyDto,
  ): Promise<DeliveryCompany> {
    const deliveryCompany = await this.prismaService.deliveryCompany.findUnique(
      {
        where: { id, deletedAt: null },
      },
    );
    if (!deliveryCompany) {
      throw new NotFoundException(`Delivery company with ID ${id} not found`);
    }
    return this.prismaService.deliveryCompany.update({
      where: { id },
      data: {
        ...updateDeliveryCompanyDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<DeliveryCompany> {
    const deliveryCompany = await this.prismaService.deliveryCompany.findUnique(
      {
        where: { id, deletedAt: null },
      },
    );
    if (!deliveryCompany) {
      throw new NotFoundException(`Delivery company with ID ${id} not found`);
    }
    return this.prismaService.deliveryCompany.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
