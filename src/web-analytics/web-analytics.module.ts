import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  WebAnalytics,
  WebAnalyticsSchema,
} from './schemas/web-analytics.schema';
import { WebAnalyticsService } from './web-analytics.service';
import { WebAnalyticsController } from './web-analytics.controller';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        if (process.env.NODE_ENV === 'test') {
          return {
            uri: 'mongodb://localhost/test',
            useNewUrlParser: true,
            useUnifiedTopology: true,
          };
        }
        return {
          uri: configService.get<string>('MONGODB_URL'),
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: WebAnalytics.name, schema: WebAnalyticsSchema },
    ]),
  ],
  providers: [WebAnalyticsService],
  controllers: [WebAnalyticsController],
  exports: [WebAnalyticsService],
})
export class WebAnalyticsModule {}
