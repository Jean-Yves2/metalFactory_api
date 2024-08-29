import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDeliveryCompanyDto } from './dto/create-delivery-company.dto';
import { UpdateDeliveryCompanyDto } from './dto/update-delivery-company.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { DeliveryCompany } from '@prisma/client';

@Injectable()
export class DeliveryCompanyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDeliveryCompanies(): Promise<DeliveryCompany[]> {
    try {
      return await this.prismaService.deliveryCompany.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting all delivery companies',
      );
    }
  }

  async getDeliveryCompanyById(id: number): Promise<DeliveryCompany> {
    try {
      const deliveryCompany =
        await this.prismaService.deliveryCompany.findUnique({
          where: { id, deletedAt: null },
        });
      if (!deliveryCompany) {
        throw new NotFoundException(`Delivery company with ID ${id} not found`);
      }
      return deliveryCompany;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error getting delivery company by ID',
      );
    }
  }

  async createDeliveryCompany(
    createDeliveryCompanyDto: CreateDeliveryCompanyDto,
  ): Promise<DeliveryCompany> {
    try {
      return await this.prismaService.deliveryCompany.create({
        data: {
          ...createDeliveryCompanyDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating delivery company');
    }
  }

  async updateDeliveryCompany(
    id: number,
    updateDeliveryCompanyDto: UpdateDeliveryCompanyDto,
  ): Promise<DeliveryCompany> {
    try {
      const deliveryCompany =
        await this.prismaService.deliveryCompany.findUnique({
          where: { id, deletedAt: null },
        });
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
    } catch (error) {
      throw new InternalServerErrorException('Error updating delivery company');
    }
  }

  async softDelete(id: number): Promise<DeliveryCompany> {
    try {
      const deliveryCompany =
        await this.prismaService.deliveryCompany.findUnique({
          where: { id, deletedAt: null },
        });
      if (!deliveryCompany) {
        throw new NotFoundException(`Delivery company with ID ${id} not found`);
      }
      return this.prismaService.deliveryCompany.update({
        where: { id },
        data: { deletedAt: new Date() },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error deleting delivery company');
    }
  }
}
