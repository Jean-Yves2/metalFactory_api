/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateWarehouseDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsInt()
  addressId: number;
}
