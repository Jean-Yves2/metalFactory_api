import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsService } from './web-analytics.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';

describe('WebAnalyticsService', () => {
  let service: WebAnalyticsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebAnalyticsService, PrismaService],
    }).compile();

    service = module.get<WebAnalyticsService>(WebAnalyticsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllWebAnalytics', () => {
    it('should return all web analytics', async () => {
      const result = []; // Remplacer par des données réelles si nécessaire
      jest
        .spyOn(prismaService.webAnalytics, 'findMany')
        .mockResolvedValue(result);
      expect(await service.getAllWebAnalytics()).toEqual(result);
    });
  });

  describe('getWebAnalyticsById', () => {
    it('should return web analytics by id', async () => {
      const result = {
        id: 1,
        pageURL: 'https://example.com',
        visitDate: new Date(),
        userId: 1,
        sessionID: 'session123',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest
        .spyOn(prismaService.webAnalytics, 'findUnique')
        .mockResolvedValue(result);
      expect(await service.getWebAnalyticsById(1)).toEqual(result);
    });

    it('should throw HttpException when web analytics is not found', async () => {
      jest
        .spyOn(prismaService.webAnalytics, 'findUnique')
        .mockResolvedValue(null);
      await expect(service.getWebAnalyticsById(100)).rejects.toThrow(
        new HttpException(
          'Web analytics with ID 100 not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('createWebAnalytics', () => {
    it('should create web analytics', async () => {
      const createWebAnalyticsDto: CreateWebAnalyticsDto = {
        pageURL: 'https://example.com',
        visitDate: new Date(),
        userId: 1,
        sessionID: 'session123',
      };
      const result = {
        id: 1,
        ...createWebAnalyticsDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      jest.spyOn(prismaService.webAnalytics, 'create').mockResolvedValue({
        ...result,
        userId: createWebAnalyticsDto.userId,
        deletedAt: result.deletedAt || new Date(),
      });
      await expect(
        service.createWebAnalytics(createWebAnalyticsDto),
      ).resolves.toEqual({
        ...result,
        deletedAt: result.deletedAt || new Date(),
      });
    });
  });

  describe('updateWebAnalytics', () => {
    it('should update web analytics', async () => {
      const updateWebAnalyticsDto = {
        pageURL: 'https://example.com/updated',
        visitDate: new Date(),
        userId: 1,
        sessionID: 'session123',
      };
      const result = { ...updateWebAnalyticsDto, id: 1, updatedAt: new Date() };
      jest.spyOn(prismaService.webAnalytics, 'findUnique').mockResolvedValue({
        ...result,
        createdAt: new Date(),
        deletedAt: null,
      });
      jest.spyOn(prismaService.webAnalytics, 'update').mockResolvedValue({
        ...result,
        createdAt: new Date(),
        deletedAt: null,
      });
      expect(
        await service.updateWebAnalytics(1, updateWebAnalyticsDto),
      ).toEqual({
        ...result,
        createdAt: expect.any(Date),
        deletedAt: null,
      });
    });

    it('should throw HttpException when web analytics is not found', async () => {
      jest
        .spyOn(prismaService.webAnalytics, 'findUnique')
        .mockResolvedValue(null);
      await expect(
        service.updateWebAnalytics(100, {
          pageURL: 'https://example.com/updated',
          visitDate: new Date(),
          userId: 1,
          sessionID: 'session123',
        }),
      ).rejects.toThrow(
        new HttpException(
          'Web analytics with ID 100 not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });

  describe('softDeleteWebAnalytics', () => {
    it('should soft delete web analytics', async () => {
      const result = {
        id: 1,
        pageURL: 'https://example.com',
        visitDate: new Date(),
        userId: 1,
        sessionID: 'session123',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
      };
      jest
        .spyOn(prismaService.webAnalytics, 'findUnique')
        .mockResolvedValue(result);
      jest
        .spyOn(prismaService.webAnalytics, 'update')
        .mockResolvedValue(result);
      expect(await service.softDeleteWebAnalytics(1)).toEqual(result);
    });

    it('should throw HttpException when web analytics is not found', async () => {
      jest
        .spyOn(prismaService.webAnalytics, 'findUnique')
        .mockResolvedValue(null);
      await expect(service.softDeleteWebAnalytics(100)).rejects.toThrow(
        new HttpException(
          'Web analytics with ID 100 not found',
          HttpStatus.NOT_FOUND,
        ),
      );
    });
  });
});
