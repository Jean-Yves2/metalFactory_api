import { Module } from '@nestjs/common';
import { QuoteLineService } from './quote-line.service';
import { QuoteLineController } from './quote-line.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [QuoteLineService],
  controllers: [QuoteLineController],
})
export class QuoteLineModule {}
