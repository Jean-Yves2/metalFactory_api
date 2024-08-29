import { Test, TestingModule } from '@nestjs/testing';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { QuoteServiceMock } from './mocks/quote.service.mock';

describe('QuoteController', () => {
  let controller: QuoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteController],
      providers: [
        {
          provide: QuoteService,
          useClass: QuoteServiceMock,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<QuoteController>(QuoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllQuotes', () => {
    it('should return an array of quotes', async () => {
      const result = await controller.findAll();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getQuoteById', () => {
    it('should return a quote', async () => {
      const result = await controller.findOne(1);
      expect(result).toBeDefined();
    });
  });

  describe('createQuote', () => {
    it('should create a quote', async () => {
      const result = await controller.create({
        clientId: 1,
        dateIssued: new Date(),
        status: 'PENDING',
        totalPrice: 100,
        discountId: 1,
        totalPriceAfterDiscount: 90,
      });
      expect(result).toBeDefined();
    });
  });

  describe('updateQuote', () => {
    it('should update a quote', async () => {
      const result = await controller.update(1, {
        clientId: 1,
        dateIssued: new Date(),
        status: 'PENDING',
        totalPrice: 100,
        discountId: 1,
        totalPriceAfterDiscount: 90,
      });
      expect(result).toBeDefined();
    });
  });

  describe('softDelete', () => {
    it('should soft delete a quote', async () => {
      const result = await controller.remove(1);
      expect(result).toBeDefined();
    });
  });
});
