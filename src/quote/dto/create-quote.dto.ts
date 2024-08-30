import { IsDecimal, IsNotEmpty, IsOptional } from 'class-validator';
import { QuoteStatus } from '@prisma/client';

export class CreateQuoteDto {
  @IsNotEmpty()
  clientId: number;

  @IsNotEmpty()
  dateIssued: Date;

  @IsNotEmpty()
  status: QuoteStatus;

  @IsNotEmpty()
  @IsDecimal()
  totalPrice: number;

  @IsOptional()
  discountId?: number;

  @IsNotEmpty()
  @IsDecimal()
  totalPriceAfterDiscount: number;
}
