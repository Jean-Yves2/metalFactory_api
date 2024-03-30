import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  basePrice: number;

  @IsNotEmpty()
  @IsNumber()
  unitPriceExclTax: number;

  @IsNotEmpty()
  @IsNumber()
  VATRate: number;

  @IsNotEmpty()
  @IsNumber()
  marginPercent: number;

  @IsOptional()
  @IsNumber()
  linearWeight?: number;
}
