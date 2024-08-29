import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
