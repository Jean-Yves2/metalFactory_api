import { Test, TestingModule } from '@nestjs/testing';
import { QuoteLineController } from './quote-line.controller';

describe('QuoteLineController', () => {
  let controller: QuoteLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuoteLineController],
    }).compile();

    controller = module.get<QuoteLineController>(QuoteLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
