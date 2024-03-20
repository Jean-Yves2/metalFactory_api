import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsDecimal()
  basePrice: number;

  @IsNotEmpty()
  @IsDecimal()
  unitPriceExclTax: number;

  @IsNotEmpty()
  @IsDecimal()
  VATRate: number;

  @IsNotEmpty()
  @IsDecimal()
  marginPercent: number;

  @IsOptional()
  @IsDecimal()
  linearWeight?: number;
}
