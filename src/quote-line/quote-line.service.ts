import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuoteLineDto } from './dto/create-quote-line.dto';
import { UpdateQuoteLineDto } from './dto/update-quote-line.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { QuoteLine } from '@prisma/client';

@Injectable()
export class QuoteLineService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllQuoteLines(): Promise<QuoteLine[]> {
    return this.prismaService.quoteLine.findMany();
  }

  async getQuoteLineById(id: number): Promise<QuoteLine> {
    const quoteLine = await this.prismaService.quoteLine.findUnique({
      where: { id },
    });
    if (!quoteLine) {
      throw new NotFoundException(`Quote line with ID ${id} not found`);
    }
    return quoteLine;
  }

  async createQuoteLine(
    createQuoteLineDto: CreateQuoteLineDto,
  ): Promise<QuoteLine> {
    return this.prismaService.quoteLine.create({
      data: createQuoteLineDto,
    });
  }

  async updateQuoteLine(
    id: number,
    updateQuoteLineDto: UpdateQuoteLineDto,
  ): Promise<QuoteLine> {
    const quoteLine = await this.prismaService.quoteLine.findUnique({
      where: { id },
    });
    if (!quoteLine) {
      throw new NotFoundException(`Quote line with ID ${id} not found`);
    }
    return this.prismaService.quoteLine.update({
      where: { id },
      data: updateQuoteLineDto,
    });
  }

  async softDelete(id: number): Promise<QuoteLine> {
    const quoteLine = await this.prismaService.quoteLine.findUnique({
      where: { id },
    });
    if (!quoteLine) {
      throw new NotFoundException(`Quote line with ID ${id} not found`);
    }
    return this.prismaService.quoteLine.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
