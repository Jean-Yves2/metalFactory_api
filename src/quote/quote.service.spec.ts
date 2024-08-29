import { Test, TestingModule } from '@nestjs/testing';
import { QuoteService } from './quote.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { quoteMock } from './mocks/quote.mock';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { QuoteStatus } from '@prisma/client';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Decimal } from '@prisma/client/runtime/library';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuoteService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllQuotes', () => {
    it('should return an array of quotes', async () => {
      const result = await service.getAllQuotes();
      const activeQuotes = quoteMock.filter(
        (quote) => quote.deletedAt === null,
      );
      expect(result).toEqual(activeQuotes);
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].quote, 'findMany')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getAllQuotes();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain('Error fetching all quotes');
      }
    });
  });
  describe('getQuoteById', () => {
    it('should return a quote', async () => {
      const result = await service.getQuoteById(1);
      expect(result).toEqual(quoteMock.find((quote) => quote.id === 1));
    });

    it('should throw an error when the quote is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.getQuoteById(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(`Quote with ID ${id} not found`);
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.getQuoteById(1);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain('Error fetching quote with id 1');
      }
    });
  });

  describe('createQuote', () => {
    it('should create a new quote', async () => {
      const newQuote: CreateQuoteDto = {
        clientId: 1,
        dateIssued: new Date('2024-04-18T09:05:38.780Z'),
        status: QuoteStatus.PENDING,
        totalPrice: 100,
        discountId: 1,
        totalPriceAfterDiscount: 90,
      };

      const result = await service.createQuote(newQuote);
      expect(result).toEqual({
        id: 4,
        clientId: 1,
        discountId: 1,
        status: QuoteStatus.PENDING,
        totalPrice: 100,
        totalPriceAfterDiscount: 90,
        dateIssued: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      jest
        .spyOn(service['prismaService'].quote, 'create')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.createQuote({
          clientId: 1,
          dateIssued: new Date('2024-04-18T09:05:38.780Z'),
          status: 'PENDING',
          totalPrice: 100,
          discountId: 1,
          totalPriceAfterDiscount: 90,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain('Error creating quote');
      }
    });
  });

  describe('updateQuote', () => {
    it('should update a quote', async () => {
      const updatedQuote = {
        status: QuoteStatus.CLOSED,
      };
      const result = await service.updateQuote(1, updatedQuote);
      expect(result).toEqual({
        id: 1,
        clientId: 1,
        discountId: 1,
        status: QuoteStatus.CLOSED,
        totalPrice: new Decimal(100),
        totalPriceAfterDiscount: new Decimal(90),
        dateIssued: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });

    it('should throw an error when the quote is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.updateQuote(id, {
          status: QuoteStatus.CLOSED,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(`Quote with ID ${id} not found`);
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 1;
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.updateQuote(id, {
          status: QuoteStatus.CLOSED,
        });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          `InternalServerErrorException: Error updating quote with id ${id}`,
        );
      }
    });
  });

  describe('softDelete', () => {
    it('should soft delete a quote', async () => {
      const result = await service.softDelete(1);
      expect(result).toEqual({
        id: 1,
        clientId: 1,
        discountId: 1,
        status: QuoteStatus.PENDING,
        totalPrice: new Decimal(100),
        totalPriceAfterDiscount: new Decimal(90),
        dateIssued: expect.any(Date),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      });
    });

    it('should throw an error when the quote is not found', async () => {
      const id = 99;
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockResolvedValue(null);
      try {
        await service.softDelete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(`Quote with ID ${id} not found`);
      }
    });

    it('should throw InternalServerErrorException when there is an internal error', async () => {
      const id = 1;
      jest
        .spyOn(service['prismaService'].quote, 'findUnique')
        .mockRejectedValue(new Error('Internal Server Error'));
      try {
        await service.softDelete(id);
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error.toString()).toContain(
          `InternalServerErrorException: Error deleting quote with id ${id}`,
        );
      }
    });
  });
});
