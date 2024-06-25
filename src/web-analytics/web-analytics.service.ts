import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';
import { WebAnalytics } from '@prisma/client';

@Injectable()
export class WebAnalyticsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllWebAnalytics(): Promise<WebAnalytics[]> {
    try {
      return await this.prismaService.webAnalytics.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all web analytics',
      );
    }
  }

  async getWebAnalyticsById(id: number): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.prismaService.webAnalytics.findUnique({
        where: { id, deletedAt: null },
      });
      if (!webAnalytics) {
        throw new NotFoundException(`Web analytics with ID ${id} not found`);
      }
      return webAnalytics;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching web analytics with id ${id}`,
      );
    }
  }

  async createWebAnalytics(
    createWebAnalyticsDto: CreateWebAnalyticsDto,
  ): Promise<WebAnalytics> {
    try {
      return await this.prismaService.webAnalytics.create({
        data: {
          ...createWebAnalyticsDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating web analytics');
    }
  }

  async updateWebAnalytics(
    id: number,
    updateWebAnalyticsDto: UpdateWebAnalyticsDto,
  ): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.prismaService.webAnalytics.findUnique({
        where: { id, deletedAt: null },
      });
      if (!webAnalytics) {
        throw new NotFoundException(`Web analytics with ID ${id} not found`);
      }
      return await this.prismaService.webAnalytics.update({
        where: { id },
        data: {
          ...updateWebAnalyticsDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating web analytics with id ${id}`,
      );
    }
  }

  async softDeleteWebAnalytics(id: number): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.prismaService.webAnalytics.findUnique({
        where: { id, deletedAt: null },
      });
      if (!webAnalytics) {
        throw new NotFoundException(`Web analytics with ID ${id} not found`);
      }
      return await this.prismaService.webAnalytics.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error deleting web analytics with id ${id}`,
      );
    }
  }
}
