import { IsString, IsOptional, IsNumber, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  basePrice: number;

  @IsNumber()
  @IsPositive()
  unitPriceExclTax: number;

  @IsNumber()
  @IsPositive()
  VATRate: number;

  @IsNumber()
  @IsPositive()
  marginPercent: number;

  @IsOptional()
  @IsNumber()
  sellingPrice?: number = 0;

  @IsOptional()
  @IsNumber()
  linearWeight?: number;

  @IsOptional()
  @IsNumber()
  thickness?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  diameter?: number;

  @IsOptional()
  @IsNumber()
  circumference?: number;

  @IsOptional()
  @IsNumber()
  sectionArea?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsString()
  matiere: string;

  @IsNumber()
  @IsPositive()
  productCode: number;
}
