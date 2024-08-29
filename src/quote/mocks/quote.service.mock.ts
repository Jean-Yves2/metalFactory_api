import { quoteMock } from './quote.mock';

export class QuoteServiceMock {
  getAllQuotes = jest.fn().mockImplementation(() => {
    const allQuotes = quoteMock.filter((quote) => quote.deletedAt === null);
    return allQuotes;
  });
  getQuoteById = jest.fn().mockImplementation((id: number) => {
    const quote = quoteMock.find(
      (quote) => quote.id === id && quote.deletedAt === null,
    );
    return quote;
  });
  createQuote = jest.fn().mockImplementation((quote) => {
    quoteMock.push(quote);
    return quote;
  });
  updateQuote = jest.fn().mockImplementation((id: number, quote) => {
    const index = quoteMock.findIndex(
      (quote) => quote.id === id && quote.deletedAt === null,
    );
    quoteMock[index] = quote;
    return quote;
  });
  softDelete = jest.fn().mockImplementation((id: number) => {
    const index = quoteMock.findIndex(
      (quote) => quote.id === id && quote.deletedAt === null,
    );

    quoteMock[index] = {
      ...quoteMock[index],
      deletedAt: new Date(),
    };
    return 'Quote deleted successfully';
  });
}
