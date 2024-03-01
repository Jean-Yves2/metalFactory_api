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

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  discountPercent: number;

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
  minPurchaseAmount?: number;

  @IsNotEmpty()
  discountType: DiscountType;

  @IsOptional()
  quotes?: Quote[];
}
