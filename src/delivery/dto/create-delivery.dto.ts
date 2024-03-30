import { IsNotEmpty, IsInt, IsDecimal, IsEnum } from 'class-validator';
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
  @IsDecimal()
  weight: number;

  @IsNotEmpty()
  @IsDecimal()
  cost: number;

  @IsNotEmpty()
  @IsDecimal()
  VATRate: number;

  @IsNotEmpty()
  @IsEnum(DeliveryStatus)
  deliveryStatus: DeliveryStatus;
}
