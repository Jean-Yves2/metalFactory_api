import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OpenRouteService } from './open-route.service';
import { OpenRouteController } from './open-route.controller';

@Module({
  imports: [HttpModule],
  providers: [OpenRouteService],
  controllers: [OpenRouteController],
})
export class OpenRouteModule {}
