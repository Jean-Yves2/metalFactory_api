import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { Quote } from '@prisma/client';

@Injectable()
export class QuoteService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllQuotes(): Promise<Quote[]> {
    try {
      return await this.prismaService.quote.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error fetching all quotes');
    }
  }

  async getQuoteById(id: number): Promise<Quote> {
    try {
      const quote = await this.prismaService.quote.findUnique({
        where: { id, deletedAt: null },
      });
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${id} not found`);
      }
      return quote;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error fetching quote with id ${id}`,
      );
    }
  }

  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    try {
      return await this.prismaService.quote.create({
        data: {
          ...createQuoteDto,
          createdAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating quote');
    }
  }

  async updateQuote(
    id: number,
    updateQuoteDto: UpdateQuoteDto,
  ): Promise<Quote> {
    try {
      const quote = await this.prismaService.quote.findUnique({
        where: { id, deletedAt: null },
      });
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${id} not found`);
      }
      return await this.prismaService.quote.update({
        where: { id },
        data: {
          ...updateQuoteDto,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error updating quote with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<Quote> {
    try {
      const quote = await this.prismaService.quote.findUnique({
        where: { id, deletedAt: null },
      });
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${id} not found`);
      }
      return await this.prismaService.quote.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        `Error deleting quote with id ${id}`,
      );
    }
  }

  async getAllQuotesWithoutException(): Promise<Quote[]> {
    return await this.prismaService.quote.findMany({
      include: { client: true },
    });
  }

  async getQuoteByIdWithQuoteLines(id: number): Promise<Quote> {
    return await this.prismaService.quote.findUnique({
      where: { id },
      include: {
        quoteLines: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}
