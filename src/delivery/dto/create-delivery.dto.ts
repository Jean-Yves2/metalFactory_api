import { IsNotEmpty, IsInt, IsDecimal, IsEnum } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

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
  @IsDecimal()
  weight: Decimal; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsDecimal()
  cost: Decimal; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsDecimal()
  VATRate: Decimal; // IsDecimal in the prisma schema (auto-converted to IsDecimal by the database)

  @IsNotEmpty()
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;
}
