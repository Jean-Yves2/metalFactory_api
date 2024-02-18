import { Test, TestingModule } from '@nestjs/testing';
import { WebAnalyticsService } from './web-analytics.service';

describe('WebAnalyticsService', () => {
  let service: WebAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebAnalyticsService],
    }).compile();

    service = module.get<WebAnalyticsService>(WebAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
