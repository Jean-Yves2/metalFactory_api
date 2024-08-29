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
  NotFoundException,
} from '@nestjs/common';
import { WebAnalyticsService } from './web-analytics.service';
import { CreateWebAnalyticsDto } from './dto/create-web-analytics.dto';
import { UpdateWebAnalyticsDto } from './dto/update-web-analytics.dto';
import { Types } from 'mongoose';

@Controller('web-analytics')
export class WebAnalyticsController {
  constructor(private readonly webAnalyticsService: WebAnalyticsService) {}

  @Get()
  findAll() {
    return this.webAnalyticsService.getAllWebAnalytics();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const objectId = this.validateObjectId(id);
    return this.webAnalyticsService.getWebAnalyticsById(objectId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createWebAnalyticsDto: CreateWebAnalyticsDto) {
    return this.webAnalyticsService.createWebAnalytics(createWebAnalyticsDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWebAnalyticsDto: UpdateWebAnalyticsDto,
  ) {
    const objectId = this.validateObjectId(id);
    return this.webAnalyticsService.updateWebAnalytics(
      objectId,
      updateWebAnalyticsDto,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const objectId = this.validateObjectId(id);
    return this.webAnalyticsService.softDeleteWebAnalytics(objectId);
  }

  private validateObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }
    return new Types.ObjectId(id);
  }
}
