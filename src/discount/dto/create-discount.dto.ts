import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';

import { DiscountType } from '@prisma/client';
import { Quote } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  discountPercent: Decimal;

  @IsNotEmpty()
  @IsDate()
  validFrom: Date;

  @IsNotEmpty()
  @IsDate()
  validTo: Date;

  @IsNotEmpty()
  @IsBoolean()
  global: boolean;

  @IsOptional()
  @IsDecimal()
  minPurchaseAmount?: Decimal;

  @IsNotEmpty()
  discountType: DiscountType;

  @IsOptional()
  quotes?: Quote[];
}
