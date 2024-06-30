import { Module } from '@nestjs/common';
import { WebAnalyticsService } from './web-analytics.service';
import { WebAnalyticsController } from './web-analytics.controller';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  providers: [WebAnalyticsService],
  controllers: [WebAnalyticsController],
})
export class WebAnalyticsModule {}
