import { Module } from '@nestjs/common';
import { QuoteLineService } from './quote-line.service';
import { QuoteLineController } from './quote-line.controller';

@Module({
  providers: [QuoteLineService],
  controllers: [QuoteLineController]
})
export class QuoteLineModule {}
