export class ProductDiscountsDto {
  quoteId: number;
  productDiscounts: { [productId: number]: number };
}
