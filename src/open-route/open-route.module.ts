import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { OpenRouteService } from './open-route.service';
import { OpenRouteController } from './open-route.controller';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OpenRouteService],
  controllers: [OpenRouteController],
})
export class OpenRouteModule {}
