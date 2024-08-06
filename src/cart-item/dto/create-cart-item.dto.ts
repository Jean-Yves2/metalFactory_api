import { IsInt } from 'class-validator';

export class CreateCartItemDto {
  @IsInt()
  cartId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}
