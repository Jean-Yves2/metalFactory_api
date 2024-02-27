import { IsNotEmpty, IsString, IsInt, IsDecimal } from 'class-validator';

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
  @IsString()
  deliveryStatus: string;
}
