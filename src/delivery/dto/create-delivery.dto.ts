import { IsNotEmpty, IsInt, IsNumber, IsEnum } from 'class-validator';
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
  weight: number; // Is Decimal in the prisma schema (auto-converted to Decimal by the database)

  @IsNotEmpty()
  @IsNumber()
  cost: number; // Is Decimal in the prisma schema (auto-converted to Decimal by the database)

  @IsNotEmpty()
  @IsNumber()
  VATRate: number; // Is Decimal in the prisma schema (auto-converted to Decimal by the database)

  @IsNotEmpty()
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;
}
