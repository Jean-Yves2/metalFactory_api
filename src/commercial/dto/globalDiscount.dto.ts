import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class GlobalDiscountDto {
  @IsInt()
  @IsPositive()
  quoteId: number;

  @IsNumber()
  @IsPositive()
  discount: number;
}
