import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsController } from './web-analytics.controller';
import { WebAnalyticsService } from './web-analytics.service';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';
import { NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { WebAnalytics } from './schemas/web-analytics.schema';

describe('WebAnalyticsController', () => {
  let controller: WebAnalyticsController;
  let service: WebAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAnalyticsController],
      providers: [
        {
          provide: WebAnalyticsService,
          useValue: {
            getWebAnalyticsById: jest.fn(),
            createWebAnalytics: jest.fn(),
            updateWebAnalytics: jest.fn(),
            softDeleteWebAnalytics: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<WebAnalyticsController>(WebAnalyticsController);
    service = module.get<WebAnalyticsService>(WebAnalyticsService);
  });

  describe('findOne', () => {
    it('should return a single web analytics record', async () => {
      const id = new Types.ObjectId();
      const result = {
        _id: id,
        pageURL: 'https://example.com',
        visitDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as WebAnalytics;

      jest.spyOn(service, 'getWebAnalyticsById').mockResolvedValue(result);

      expect(await controller.findOne(id.toHexString())).toEqual(result);
    });

    it('should throw NotFoundException when the record is not found', async () => {
      const id = new Types.ObjectId();

      jest
        .spyOn(service, 'getWebAnalyticsById')
        .mockRejectedValue(
          new NotFoundException(`Web analytics with ID ${id} not found`),
        );

      await expect(controller.findOne(id.toHexString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new web analytics record', async () => {
      const createWebAnalyticsDto: CreateWebAnalyticsDto = {
        pageURL: 'http://example.com',
        visitDate: new Date(),
      };
      const result = {
        _id: new Types.ObjectId(),
        ...createWebAnalyticsDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as WebAnalytics;

      jest.spyOn(service, 'createWebAnalytics').mockResolvedValue(result);
      expect(await controller.create(createWebAnalyticsDto)).toEqual(result);
    });
  });

  describe('update', () => {
    it('should update a web analytics record', async () => {
      const id = new Types.ObjectId();
      const updateWebAnalyticsDto: UpdateWebAnalyticsDto = {
        pageURL: 'http://example.com',
        visitDate: new Date(),
      };
      const result = {
        _id: id,
        ...updateWebAnalyticsDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as WebAnalytics;

      jest.spyOn(service, 'updateWebAnalytics').mockResolvedValue(result);

      expect(
        await controller.update(id.toHexString(), updateWebAnalyticsDto),
      ).toEqual(result);
    });

    it('should throw NotFoundException when the record to update is not found', async () => {
      const id = new Types.ObjectId();
      const updateWebAnalyticsDto: UpdateWebAnalyticsDto = {
        pageURL: 'http://example.com',
        visitDate: new Date(),
      };

      jest
        .spyOn(service, 'updateWebAnalytics')
        .mockRejectedValue(
          new NotFoundException(`Web analytics with ID ${id} not found`),
        );

      await expect(
        controller.update(id.toHexString(), updateWebAnalyticsDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should soft delete a web analytics record', async () => {
      const id = new Types.ObjectId();
      const result = {
        _id: id,
        pageURL: 'http://example.com',
        visitDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      } as WebAnalytics;

      jest.spyOn(service, 'softDeleteWebAnalytics').mockResolvedValue(result);

      expect(await controller.remove(id.toHexString())).toEqual(result);
    });

    it('should throw NotFoundException when the record to delete is not found', async () => {
      const id = new Types.ObjectId();

      jest
        .spyOn(service, 'softDeleteWebAnalytics')
        .mockRejectedValue(
          new NotFoundException(`Web analytics with ID ${id} not found`),
        );

      await expect(controller.remove(id.toHexString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
