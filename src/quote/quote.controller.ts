import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  findAll() {
    return this.quoteService.getAllQuotes();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.getQuoteById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.createQuote(createQuoteDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return this.quoteService.updateQuote(id, updateQuoteDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.softDelete(id);
  }
}
