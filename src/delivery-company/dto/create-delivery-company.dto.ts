import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateDeliveryCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  baseRate: number;

  @IsNotEmpty()
  @IsNumber()
  ratePerKm: number;

  @IsNotEmpty()
  @IsNumber()
  weightSurcharge: number;
}
