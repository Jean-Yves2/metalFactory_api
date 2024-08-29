import {
  IsNotEmpty,
  IsNumber,
  IsDecimal,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateSupplierOrderLineDto {
  @IsNotEmpty()
  @IsNumber()
  supplierOrderId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  orderedQuantity: number;

  @IsNotEmpty()
  @IsDecimal()
  unitPriceExclTax: number;

  @IsNumber()
  @IsOptional()
  receivedQuantity?: number;

  @IsNumber()
  @IsOptional()
  discrepancy?: number;

  @IsDate()
  @IsOptional()
  receivedDate?: Date;
}
