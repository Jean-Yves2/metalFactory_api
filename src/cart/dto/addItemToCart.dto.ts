import { IsInt, IsPositive, IsNumber } from 'class-validator';

export class AddItemToCartDto {
  @IsInt()
  @IsPositive()
  productCode: number;

  @IsInt()
  @IsPositive()
  quantity: number;

  @IsNumber()
  length: number;
}
