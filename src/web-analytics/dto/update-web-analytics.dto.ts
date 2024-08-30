import { PartialType } from '@nestjs/mapped-types';
import { CreateWebAnalyticsDto } from './create-web-analytics.dto';

export class UpdateWebAnalyticsDto extends PartialType(CreateWebAnalyticsDto) {}
