import {
  IsNotEmpty,
  IsInt,
  IsNumber,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { DeliveryStatus } from '@prisma/client';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsInt()
  orderId: number;

  @IsNotEmpty()
  @IsInt()
  deliveryCompanyId: number;

  @IsNotEmpty()
  @IsInt()
  distance: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsNumber()
  cost: number; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsNumber()
  VATRate: number; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;
}
