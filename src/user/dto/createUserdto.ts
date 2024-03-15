import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateAddressDto } from '../../address/dto/create-address.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsOptional()
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
