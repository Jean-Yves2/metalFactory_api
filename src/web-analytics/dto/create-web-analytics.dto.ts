import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateWebAnalyticsDto {
  @IsNotEmpty()
  @IsString()
  pageURL: string;

  @IsNotEmpty()
  @IsDateString()
  visitDate: Date;
}
