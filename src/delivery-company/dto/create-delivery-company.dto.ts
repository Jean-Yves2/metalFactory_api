import { IsNotEmpty, IsString, IsDecimal } from 'class-validator';

export class CreateDeliveryCompanyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDecimal()
  baseRate: number;

  @IsNotEmpty()
  @IsDecimal()
  ratePerKm: number;

  @IsNotEmpty()
  @IsDecimal()
  weightSurcharge: number;
}
