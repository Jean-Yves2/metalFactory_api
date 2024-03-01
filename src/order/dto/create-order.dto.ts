import { IsInt, IsDate, IsDecimal, IsNotEmpty } from 'class-validator';
import { OrderStatus } from '@prisma/client';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  status: OrderStatus;

  @IsDecimal()
  totalExclTax: number;

  @IsDecimal()
  totalInclTax: number;

  @IsInt()
  deliveryAddressId: number;
}
