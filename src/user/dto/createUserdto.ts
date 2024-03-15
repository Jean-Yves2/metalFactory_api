import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
