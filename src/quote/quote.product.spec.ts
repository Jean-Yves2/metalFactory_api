import { Test, TestingModule } from '@nestjs/testing';
import { QuoteModule } from './quote.module';

describe('QuoteModule', () => {
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [QuoteModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });
});
