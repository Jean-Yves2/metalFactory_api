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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';

@ApiTags('quote')
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir toutes les devis' })
  findAll() {
    return this.quoteService.getAllQuotes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un devis par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.getQuoteById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau devis' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.createQuote(createQuoteDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un devis existant' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuoteDto: UpdateQuoteDto,
  ) {
    return this.quoteService.updateQuote(id, updateQuoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) un devis par son ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quoteService.softDelete(id);
  }
}
