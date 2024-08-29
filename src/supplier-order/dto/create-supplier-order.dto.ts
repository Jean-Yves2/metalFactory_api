import { IsNotEmpty, IsNumber, IsDate, IsEnum } from 'class-validator';
import { SupplierOrderStatus } from '@prisma/client';

export class CreateSupplierOrderDto {
  @IsNotEmpty()
  @IsNumber()
  supplierId: number;

  @IsNotEmpty()
  @IsDate()
  orderDate: Date;

  @IsNotEmpty()
  @IsDate()
  expectedDeliveryDate: Date;

  @IsNotEmpty()
  @IsEnum(SupplierOrderStatus)
  status: SupplierOrderStatus;
}
