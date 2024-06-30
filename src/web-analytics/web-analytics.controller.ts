import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { WebAnalyticsService } from './web-analytics.service';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';

@Controller('web-analytics')
export class WebAnalyticsController {
  constructor(private readonly webAnalyticsService: WebAnalyticsService) {}

  @Get()
  findAll() {
    return this.webAnalyticsService.getAllWebAnalytics();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.webAnalyticsService.getWebAnalyticsById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWebAnalyticsDto: CreateWebAnalyticsDto) {
    return this.webAnalyticsService.createWebAnalytics(createWebAnalyticsDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWebAnalyticsDto: UpdateWebAnalyticsDto,
  ) {
    return this.webAnalyticsService.updateWebAnalytics(
      id,
      updateWebAnalyticsDto,
    );
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.webAnalyticsService.softDeleteWebAnalytics(id);
  }
}
