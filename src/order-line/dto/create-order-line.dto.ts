import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateOrderLineDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  cutLength: number;
}
