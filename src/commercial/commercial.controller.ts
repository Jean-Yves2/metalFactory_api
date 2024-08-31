import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommercialService } from './commercial.service';
import { QuoteStatus } from '@prisma/client';
import { QuoteService } from '../quote/quote.service';
import { GlobalDiscountDto } from './dto/globalDiscount.dto';
import { ProductDiscountsDto } from './dto/productDiscount.dto';

@ApiTags('Commercial')
@Controller('commercial')
export class CommercialController {
  constructor(
    private readonly commercialService: CommercialService,
    private readonly quoteService: QuoteService,
  ) {}

  @Get('quotes')
  @ApiOperation({ summary: 'Obtenir toutes les devis sans exception' })
  @ApiResponse({
    status: 200,
    description: 'Liste de tous les devis sans exception.',
  })
  getAllQuotesWithoutException() {
    return this.quoteService.getAllQuotesWithoutException();
  }

  @Get('quotes/:status')
  @ApiOperation({ summary: 'Obtenir les devis filtrés par statut' })
  @ApiResponse({
    status: 200,
    description: 'Liste des devis selon le statut spécifié.',
  })
  @ApiResponse({ status: 400, description: 'Statut invalide.' })
  getQuotesByStatus(@Param('status') status: QuoteStatus) {
    return this.commercialService.getQuotesByStatus(status);
  }

  @Get('order-history/:clientId')
  @ApiOperation({
    summary: 'Obtenir l’historique des commandes pour un client spécifique',
  })
  @ApiResponse({
    status: 200,
    description: 'Historique des commandes pour le client spécifié.',
  })
  @ApiResponse({ status: 400, description: 'ID de client invalide.' })
  getOrderHistory(@Param('clientId') clientId: number) {
    console.log('clientId', clientId);
    return this.commercialService.getOrderHistory(Number(clientId));
  }

  @Patch('quotes/:quoteId/discount')
  @ApiOperation({ summary: 'Appliquer une réduction à un devis' })
  @ApiResponse({
    status: 200,
    description: 'Réduction appliquée au devis spécifié.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID du devis ou ID de la réduction invalide.',
  })
  @Patch('products/:productId/price')
  @ApiOperation({ summary: 'Calculer le prix de vente d’un produit' })
  @ApiResponse({
    status: 200,
    description: 'Prix de vente calculé pour le produit spécifié.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID du produit ou pourcentage de marge invalide.',
  })
  calculateSellingPrice(
    @Param('productId') productId: number,
    @Body('marginPercent') marginPercent?: number,
  ) {
    return this.commercialService.calculateSellingPrice(
      productId,
      marginPercent,
    );
  }

  // Appliquer une réduction globale à un devis
  @Post('discount/global')
  async applyGlobalDiscountToQuote(
    @Body() globalDiscountDto: GlobalDiscountDto,
  ) {
    const { discount, quoteId } = globalDiscountDto;
    return this.commercialService.applyGlobalDiscountToQuote(discount, quoteId);
  }

  // Appliquer des réductions par produit dans un devis
  @Post('discount/product')
  async applyProductDiscountToQuote(
    @Body() productDiscountsDto: ProductDiscountsDto,
  ) {
    const { quoteId, productDiscounts } = productDiscountsDto;
    return this.commercialService.applyProductDiscountToQuote(
      quoteId,
      productDiscounts,
    );
  }
}
