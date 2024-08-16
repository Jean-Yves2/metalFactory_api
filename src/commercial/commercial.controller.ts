import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { CommercialService } from './commercial.service';
import { QuoteStatus } from '@prisma/client';
import { QuoteService } from '../quote/quote.service';
import { get } from 'http';

@Controller('commercial')
export class CommercialController {
  constructor(
    private readonly commercialService: CommercialService,
    private readonly quoteService: QuoteService,
  ) {}

  @Get('quotes')
  getAllQuotesWithoutException() {
    return this.quoteService.getAllQuotesWithoutException();
  }

  @Get('quotes/:status')
  getQuotesByStatus(@Param('status') status: QuoteStatus) {
    return this.commercialService.getQuotesByStatus(status);
  }

  @Get('order-history/:clientId')
  getOrderHistory(@Param('clientId') clientId: number) {
    console.log('clientId', clientId);
    return this.commercialService.getOrderHistory(Number(clientId));
  }

  @Patch('quotes/:quoteId/discount')
  applyDiscountToQuote(
    @Param('quoteId') quoteId: number,
    @Body('discountId') discountId: number,
  ) {
    return this.commercialService.applyDiscountToQuote(quoteId, discountId);
  }

  @Patch('products/:productId/price')
  calculateSellingPrice(
    @Param('productId') productId: number,
    @Body('marginPercent') marginPercent?: number,
  ) {
    return this.commercialService.calculateSellingPrice(
      productId,
      marginPercent,
    );
  }
}
