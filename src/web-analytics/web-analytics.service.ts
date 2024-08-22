import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';
import { WebAnalytics } from './schemas/web-analytics.schema';

@Injectable()
export class WebAnalyticsService {
  constructor(
    @InjectModel(WebAnalytics.name)
    private readonly webAnalyticsModel: Model<WebAnalytics>,
  ) {}

  async getAllWebAnalytics(): Promise<WebAnalytics[]> {
    try {
      return await this.webAnalyticsModel.find({ deletedAt: null }).exec();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching all web analytics',
      );
    }
  }

  async getWebAnalyticsById(id: Types.ObjectId): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.webAnalyticsModel
        .findById(id)
        .where({ deletedAt: null })
        .exec();

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
      const createdWebAnalytics = await this.webAnalyticsModel.create(
        createWebAnalyticsDto,
      );
      return createdWebAnalytics;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create web analytics');
    }
  }

  async updateWebAnalytics(
    id: Types.ObjectId,
    updateWebAnalyticsDto: UpdateWebAnalyticsDto,
  ): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.webAnalyticsModel
        .findById(id)
        .where({ deletedAt: null })
        .exec();

      if (!webAnalytics) {
        throw new NotFoundException(`Web analytics with ID ${id} not found`);
      }

      webAnalytics.set({
        ...updateWebAnalyticsDto,
        updatedAt: new Date(),
      });

      return await webAnalytics.save();
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating web analytics with id ${id}`,
      );
    }
  }

  async softDeleteWebAnalytics(id: Types.ObjectId): Promise<WebAnalytics> {
    try {
      const webAnalytics = await this.webAnalyticsModel
        .findById(id)
        .where({ deletedAt: null })
        .exec();

      if (!webAnalytics) {
        throw new NotFoundException(`Web analytics with ID ${id} not found`);
      }

      webAnalytics.deletedAt = new Date();
      return await webAnalytics.save();
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
