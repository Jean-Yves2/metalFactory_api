import { Module } from '@nestjs/common';
import { OpenRouteService } from './open-route.service';
import { OpenRouteController } from './open-route.controller';

@Module({
  providers: [OpenRouteService],
  controllers: [OpenRouteController]
})
export class OpenRouteModule {}
