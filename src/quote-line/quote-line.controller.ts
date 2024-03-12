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
} from '@nestjs/common';

import { QuoteLineService } from './quote-line.service';
import { CreateQuoteLineDto } from './dto/create-quote-line.dto';
import { UpdateQuoteLineDto } from './dto/update-quote-line.dto';

@Controller('quote-line')
export class QuoteLineController {
  constructor(private readonly quoteLineService: QuoteLineService) {}

  @Get()
  findAll() {
    return this.quoteLineService.getAllQuoteLines();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.quoteLineService.getQuoteLineById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuoteLineDto: CreateQuoteLineDto) {
    return this.quoteLineService.createQuoteLine(createQuoteLineDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateQuoteLineDto: UpdateQuoteLineDto,
  ) {
    return this.quoteLineService.updateQuoteLine(id, updateQuoteLineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.quoteLineService.softDelete(id);
  }
}
