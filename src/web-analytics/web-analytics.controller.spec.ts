import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsController } from './web-analytics.controller';

describe('WebAnalyticsController', () => {
  let controller: WebAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebAnalyticsController],
    }).compile();

    controller = module.get<WebAnalyticsController>(WebAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
