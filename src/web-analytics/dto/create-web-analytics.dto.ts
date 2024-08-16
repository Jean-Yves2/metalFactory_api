import {
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateWebAnalyticsDto {
  @IsNotEmpty()
  @IsString()
  pageURL: string;

  @IsNotEmpty()
  @IsDateString()
  visitDate: Date;

  @IsOptional()
  @IsInt()
  userId?: number;

  @IsNotEmpty()
  @IsString()
  sessionID: string;
}
