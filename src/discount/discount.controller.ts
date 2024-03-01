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

import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  findAll() {
    return this.discountService.getAllDiscounts();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.discountService.getDiscountById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.updateDiscount(id, updateDiscountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.discountService.softDelete(id);
  }
}
