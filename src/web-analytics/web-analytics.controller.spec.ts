import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsController } from './web-analytics.controller';
import { WebAnalyticsService } from './web-analytics.service';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';

describe('WebAnalyticsController', () => {
  let controller: WebAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAnalyticsController],
      providers: [
        {
          provide: WebAnalyticsService,
          useValue: {
            getAllWebAnalytics: jest.fn().mockResolvedValue([]),
            getWebAnalyticsById: jest.fn().mockResolvedValue({}),
            createWebAnalytics: jest.fn().mockResolvedValue({}),
            updateWebAnalytics: jest.fn().mockResolvedValue({}),
            softDeleteWebAnalytics: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<WebAnalyticsController>(WebAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of web analytics', async () => {
      await expect(controller.findAll()).resolves.toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a single web analytics record', async () => {
      const id = 1;
      await expect(controller.findOne(id)).resolves.toEqual({});
    });
  });

  describe('create', () => {
    it('should create a new web analytics record', async () => {
      const createWebAnalyticsDto: CreateWebAnalyticsDto = {
        pageURL: 'http://example.com',
        visitDate: new Date(),
        sessionID: 'session123',
      };
      await expect(controller.create(createWebAnalyticsDto)).resolves.toEqual(
        {},
      );
    });
  });

  describe('update', () => {
    it('should update a web analytics record', async () => {
      const id = 1;
      const updateWebAnalyticsDto: UpdateWebAnalyticsDto = {
        pageURL: 'http://example.com',
        visitDate: new Date(),
        sessionID: 'session123',
      };
      await expect(
        controller.update(id, updateWebAnalyticsDto),
      ).resolves.toEqual({});
    });
  });

  describe('remove', () => {
    it('should soft delete a web analytics record', async () => {
      const id = 1;
      await expect(controller.remove(id)).resolves.toEqual({});
    });
  });
});
