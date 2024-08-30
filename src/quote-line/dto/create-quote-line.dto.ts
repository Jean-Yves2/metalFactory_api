import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateQuoteLineDto {
  @IsNotEmpty()
  @IsNumber()
  quoteId: number;

  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsDecimal()
  unitPrice: number;

  @IsNotEmpty()
  @IsNumber()
  discountApplied: boolean;
}
