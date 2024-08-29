import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsService } from './web-analytics.service';
import { getModelToken } from '@nestjs/mongoose';
import { WebAnalytics } from './schemas/web-analytics.schema';
import { Model, Types } from 'mongoose';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

class MockModel {
  constructor(private data?: any) {}
  save = jest.fn().mockResolvedValue(this.data);
  static find = jest.fn();
  static findById = jest.fn();
  static findOne = jest.fn();
  static exec = jest.fn();
}

describe('WebAnalyticsService', () => {
  let service: WebAnalyticsService;
  let model: Model<WebAnalytics>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebAnalyticsService,
        {
          provide: getModelToken(WebAnalytics.name),
          useValue: MockModel,
        },
      ],
    }).compile();

    service = module.get<WebAnalyticsService>(WebAnalyticsService);
    model = module.get<Model<WebAnalytics>>(getModelToken(WebAnalytics.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllWebAnalytics', () => {
    it('should return all web analytics data', async () => {
      const mockData = [
        {
          _id: '507f191e810c19729de860ea',
          pageURL: 'https://example.com',
          visitDate: new Date(),
        },
        {
          _id: '507f191e810c19729de860eb',
          pageURL: 'https://another.com',
          visitDate: new Date(),
        },
      ];

      MockModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockData),
      });

      const result = await service.getAllWebAnalytics();
      expect(result).toHaveLength(2);
      expect(result[0].pageURL).toBe('https://example.com');
    });

    it('should throw InternalServerErrorException on errors', async () => {
      MockModel.find.mockReturnValue({
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(service.getAllWebAnalytics()).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getWebAnalyticsById', () => {
    it('should return web analytics by id', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      const mockData = {
        _id: id,
        pageURL: 'https://example.com',
        visitDate: new Date(),
      };

      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockData),
      });

      const result = await service.getWebAnalyticsById(id);
      expect(result).toEqual(mockData);
    });

    it('should throw NotFoundException when web analytics is not found', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getWebAnalyticsById(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException on unexpected errors', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(service.getWebAnalyticsById(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('createWebAnalytics', () => {
    it('should create web analytics with correct data', async () => {
      const createWebAnalyticsDto = {
        pageURL: 'https://example.com',
        visitDate: new Date(),
      };
      const mockData = {
        ...createWebAnalyticsDto,
        createdAt: expect.any(Date),
      };

      (model as any).create = jest.fn().mockResolvedValue(mockData);

      const result = await service.createWebAnalytics(createWebAnalyticsDto);
      expect(result).toEqual(mockData);
    });

    it('should throw InternalServerErrorException on error', async () => {
      (model as any).create = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));

      await expect(
        service.createWebAnalytics({
          pageURL: 'https://example.com',
          visitDate: new Date(),
        }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('updateWebAnalytics', () => {
    it('should update web analytics with correct data', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      const updateWebAnalyticsDto = { pageURL: 'https://updated.com' };
      const mockData = {
        _id: id,
        pageURL: 'https://example.com',
        visitDate: new Date(),
        set: jest.fn(),
        save: jest.fn(),
      };

      mockData.set.mockReturnThis();
      mockData.save.mockResolvedValue({
        _id: id,
        ...updateWebAnalyticsDto,
        updatedAt: expect.any(Date),
      });

      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockData),
      });

      const result = await service.updateWebAnalytics(
        id,
        updateWebAnalyticsDto,
      );
      expect(result.pageURL).toBe('https://updated.com');
    });

    it('should throw NotFoundException if web analytics is not found during update', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(
        service.updateWebAnalytics(id, { pageURL: 'https://updated.com' }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw InternalServerErrorException on update error', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(
        service.updateWebAnalytics(id, { pageURL: 'https://updated.com' }),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('softDeleteWebAnalytics', () => {
    it('should soft delete web analytics by setting deletedAt', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      const mockData = {
        _id: id,
        pageURL: 'https://example.com',
        visitDate: new Date(),
        deletedAt: null,
        save: jest.fn().mockResolvedValue({
          _id: id,
          pageURL: 'https://example.com',
          visitDate: expect.any(Date),
          deletedAt: expect.any(Date),
        }),
      };

      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockData),
      });

      const result = await service.softDeleteWebAnalytics(id);
      expect(result.deletedAt).toBeDefined();
    });

    it('should throw NotFoundException if web analytics is not found during delete', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.softDeleteWebAnalytics(id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw InternalServerErrorException on delete error', async () => {
      const id = new Types.ObjectId('507f1f77bcf86cd799439011');
      MockModel.findById.mockReturnValue({
        where: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(new Error('Database error')),
      });

      await expect(service.softDeleteWebAnalytics(id)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
