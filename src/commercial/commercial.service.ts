import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { QuoteStatus } from '@prisma/client';

@Injectable()
export class CommercialService {
  constructor(private prisma: PrismaService) {}

  // Récupérer les devis en fonction de leur statut
  async getQuotesByStatus(status: QuoteStatus) {
    return this.prisma.quote.findMany({
      where: { status },
      include: { client: true, quoteLines: true },
    });
  }

  // Récupérer l'historique des commandes d'un client
  async getOrderHistory(clientId: number) {
    return this.prisma.order.findMany({
      where: { customerId: clientId },
      include: { orderLines: true },
    });
  }

  async applyGlobalDiscountToQuote(quoteId: number, discountPercent: number) {
    console.log('quoteId', quoteId);
    console.log('discountPercent', discountPercent);
    return { success: true };
  }

  // Appliquer une réduction spécifique par article (produit)
  async applyProductDiscountToQuote(
    quoteId: number,
    productDiscounts: { [productId: number]: number },
  ) {
    console.log('quoteId', quoteId);
    console.log('productDiscounts', productDiscounts);
    return null;
  }

  // Calculer le prix de vente pour un produit avec une marge
  async calculateSellingPrice(productId: number, marginPercent?: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const margin =
      marginPercent !== undefined ? marginPercent : product.marginPercent || 20;

    if (margin < 0 || margin > 100) {
      throw new BadRequestException('Invalid margin percent');
    }

    const sellingPrice = product.basePrice * (1 + margin / 100);

    return this.prisma.product.update({
      where: { id: productId },
      data: { sellingPrice },
    });
  }
}
