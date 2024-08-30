import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsDate,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '@prisma/client'; // Assurez-vous que ce chemin est correct
import { PaymentStatus } from '@prisma/client'; // Assurez-vous que ce chemin est correct

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  paymentDate: Date;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @IsNotEmpty()
  @IsString()
  transactionId: string;

  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
