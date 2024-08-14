import { IsInt, IsPositive } from 'class-validator';

export class RemoveItemFromCartDto {
  @IsInt()
  @IsPositive()
  cartId: number;

  @IsInt()
  @IsPositive()
  productCode: number;
}
