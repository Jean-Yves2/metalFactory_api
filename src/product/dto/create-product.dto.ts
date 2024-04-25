import { Decimal } from '@prisma/client/runtime/library';
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
  basePrice: Decimal;

  @IsNotEmpty()
  @IsDecimal()
  unitPriceExclTax: Decimal;

  @IsNotEmpty()
  @IsDecimal()
  VATRate: Decimal;

  @IsNotEmpty()
  @IsDecimal()
  marginPercent: Decimal;

  @IsNotEmpty()
  @IsDecimal()
  sellingPrice: Decimal;

  @IsOptional()
  @IsDecimal()
  linearWeight?: Decimal;
}
