import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { DiscountService } from '../discount/discount.service';
import { QuoteStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class CommercialService {
  constructor(
    private prisma: PrismaService,
    private discountService: DiscountService,
  ) {}

  async getQuotesByStatus(status: QuoteStatus) {
    return this.prisma.quote.findMany({
      where: { status },
      include: { client: true, quoteLines: true },
    });
  }

  async getOrderHistory(clientId: number) {
    return this.prisma.order.findMany({
      where: { customerId: clientId },
      include: { orderLines: true },
    });
  }

  async applyGlobalDiscountToQuote(quoteId: number, discountPercent: number) {
    if (discountPercent < 0 || discountPercent > 100) {
      throw new BadRequestException('Invalid discount percent');
    }

    const quote = await this.prisma.quote.findUnique({
      where: { id: quoteId },
      include: { quoteLines: true },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    let discountId = quote.discountId;

    if (!discountId) {
      const newDiscount = await this.discountService.createDiscount({
        description: 'Vous avez une remise globale de ' + discountPercent + '%',
        global: true,
        discountType: 'PROFESSIONAL',
        discountPercent: new Decimal(discountPercent),
        validFrom: new Date(),
        validTo: new Date(),
      });

      discountId = newDiscount.id;

      await this.prisma.quote.update({
        where: { id: quoteId },
        data: {
          discountId: discountId,
        },
      });
    }

    let totalPriceAfterDiscount = 0;

    for (const quoteLine of quote.quoteLines) {
      const product = await this.prisma.product.findUnique({
        where: { id: quoteLine.productId },
      });

      if (!product) {
        throw new NotFoundException(
          `Product with id ${quoteLine.productId} not found`,
        );
      }

      const finalSellingPrice =
        product.sellingPrice * (1 - discountPercent / 100);

      await this.prisma.quoteLine.update({
        where: { id: quoteLine.id },
        data: {
          discountApplied: true,
          finalSellingPrice,
        },
      });

      totalPriceAfterDiscount += finalSellingPrice * quoteLine.quantity;
    }
    await this.prisma.quote.update({
      where: { id: quoteId },
      data: {
        totalPriceAfterDiscount,
        status: 'IN_PROCESS',
        updatedAt: new Date(),
      },
    });

    return { success: true };
  }

  async applyProductDiscountToQuote(
    quoteId: number,
    productDiscounts: { [productId: number]: number },
  ) {
    const quote = await this.prisma.quote.findUnique({
      where: { id: quoteId },
      include: { quoteLines: true },
    });

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    let totalPriceAfterDiscount = 0;

    for (const quoteLine of quote.quoteLines) {
      const productId = quoteLine.productId;
      const discountPercent = productDiscounts[productId];

      if (
        discountPercent === undefined ||
        discountPercent < 0 ||
        discountPercent > 100
      ) {
        throw new BadRequestException(
          `Invalid discount percent for product ${productId}`,
        );
      }

      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }
      const finalSellingPrice =
        product.sellingPrice * (1 - discountPercent / 100);

      await this.prisma.quoteLine.update({
        where: { id: quoteLine.id },
        data: {
          discountApplied: true,
          finalSellingPrice,
        },
      });

      totalPriceAfterDiscount += finalSellingPrice * quoteLine.quantity;
    }

    await this.prisma.quote.update({
      where: { id: quoteId },
      data: {
        totalPriceAfterDiscount,
        status: 'IN_PROCESS',
        updatedAt: new Date(),
      },
    });

    return { success: true, totalPriceAfterDiscount };
  }

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
