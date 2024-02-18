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
  @IsString()
  city?: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  country: string;

  @IsOptional()
  @IsPostalCode()
  postalCode?: string;
}
