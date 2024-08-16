import { Injectable } from '@nestjs/common';
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

  // Appliquer une ristourne à un devis
  async applyDiscountToQuote(quoteId: number, discountId: number) {
    // Récupérer la ristourne
    const discount = await this.prisma.discount.findUnique({
      where: { id: discountId },
    });

    if (!discount) throw new Error('Discount not found');

    // Récupérer le devis
    const quote = await this.prisma.quote.findUnique({
      where: { id: quoteId },
      include: { quoteLines: true },
    });

    if (!quote) throw new Error('Quote not found');

    // Calculer le prix après réduction
    const totalPriceAfterDiscount = discount.global
      ? Number(quote.totalPrice) -
        (Number(discount.discountPercent) / 100) * Number(quote.totalPrice)
      : quote.totalPrice;

    // Mettre à jour le devis avec la réduction
    const updatedQuote = await this.prisma.quote.update({
      where: { id: quoteId },
      data: {
        discountId: discount.id,
        totalPriceAfterDiscount: totalPriceAfterDiscount,
      },
    });

    // Appliquer la ristourne par article si non globale
    if (!discount.global) {
      await this.prisma.quoteLine.updateMany({
        where: { quoteId },
        data: { discountApplied: true },
      });
    }

    return updatedQuote;
  }

  // Calculer le prix de vente pour un produit avec une marge
  async calculateSellingPrice(productId: number, marginPercent?: number) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) throw new Error('Product not found');

    const margin = marginPercent || product.marginPercent || 20;
    const sellingPrice = product.basePrice * (1 + margin / 100);

    return this.prisma.product.update({
      where: { id: productId },
      data: { sellingPrice },
    });
  }
}
