import { NotFoundException } from '@nestjs/common';
import { quoteMock } from './quote.mock';

export class PrismaServiceMock {
  quote = {
    findMany: jest.fn().mockImplementation(() => {
      const allQuotes = quoteMock.filter(
        (quote) => quote.deletedAt === null && quote.deletedAt === null,
      );
      return allQuotes;
    }),

    findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
      const quote = quoteMock.find(
        (quote) => quote.id === id && quote.deletedAt === null,
      );
      return quote;
    }),

    create: jest.fn().mockImplementation((createQuoteDto) => {
      const newQuote = {
        clientId: createQuoteDto.data.clientId,
        dateIssued: new Date(),
        status: createQuoteDto.data.status,
        totalPrice: createQuoteDto.data.totalPrice,
        discountId: createQuoteDto.data.discountId,
        totalPriceAfterDiscount: createQuoteDto.data.totalPriceAfterDiscount,
        deletedAt: null,
        id: quoteMock.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return newQuote;
    }),

    update: jest.fn().mockImplementation(({ where: { id }, data }: any) => {
      const quote = quoteMock.find((quote) => quote.id === id);
      if (!quote) {
        throw new NotFoundException(`Quote with ID ${id} not found`);
      }
      const updatedQuote = {
        ...quote,
        ...data,
        updatedAt: new Date(),
      };
      return updatedQuote;
    }),
  };
}
