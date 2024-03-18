import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Quote } from '@prisma/client';

@Injectable()
export class QuoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllQuotes(): Promise<Quote[]> {
    // Logic to fetch all quotes from a data source
    return this.prismaService.quote.findMany({
      where: { deletedAt: null },
    });
  }

  async getQuoteById(id: number): Promise<Quote> {
    // Logic to fetch a quote by its ID from a data source
    const quote = await this.prismaService.quote.findUnique({
      where: { id, deletedAt: null },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return quote;
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    return this.prismaService.quote.create({
      data: {
        ...createQuoteDto,
        createdAt: new Date(),
      },
    });
  }

  async updateQuote(
    id: number,
    updateQuoteDto: UpdateQuoteDto,
  ): Promise<Quote> {
    const quote = await this.prismaService.quote.findUnique({
      where: { id, deletedAt: null },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return this.prismaService.quote.update({
      where: { id },
      data: {
        ...updateQuoteDto,
        updatedAt: new Date(),
      },
    });
  }

  async softDelete(id: number): Promise<Quote> {
    const quote = await this.prismaService.quote.findUnique({
      where: { id, deletedAt: null },
    });
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    return this.prismaService.quote.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
