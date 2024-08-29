import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty()
  @IsNumber()
  warehouseId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  minThreshold: number;
}
