import { IsNotEmpty } from 'class-validator';
import { CreateAddressDto } from '../../address/dto/create-address.dto';
export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  SIRET: string;

  @IsNotEmpty()
  address: CreateAddressDto;

  @IsNotEmpty()
  contactEmail: string;

  @IsNotEmpty()
  contactPhone: string;
}
