import { IsInt, IsDate, IsDecimal, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  status: OrderStatus;

  @IsDecimal()
  totalExclTax: Decimal;

  @IsDecimal()
  totalInclTax: Decimal;

  @IsInt()
  deliveryAddressId: number;
}
