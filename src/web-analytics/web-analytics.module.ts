import { Module } from '@nestjs/common';
import { WebAnalyticsService } from './web-analytics.service';
import { WebAnalyticsController } from './web-analytics.controller';

@Module({
  providers: [WebAnalyticsService],
  controllers: [WebAnalyticsController]
})
export class WebAnalyticsModule {}
