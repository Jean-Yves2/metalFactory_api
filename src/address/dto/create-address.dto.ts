import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsPostalCode,
  IsAlpha,
} from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsOptional()
  @IsPostalCode()
  postalCode?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  country: string;

  @IsOptional()
  @IsString()
  distanceToWarehouse?: number;

  @IsOptional()
  @IsString()
  userId?: number;

  @IsOptional()
  @IsString()
  addressId?: number;

  @IsOptional()
  @IsString()
  type?: 'DELIVERY' | 'BILLING';
}
