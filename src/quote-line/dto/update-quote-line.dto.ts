import { PartialType } from '@nestjs/mapped-types';
import { CreateQuoteLineDto } from './create-quote-line.dto';

export class UpdateQuoteLineDto extends PartialType(CreateQuoteLineDto) {}
