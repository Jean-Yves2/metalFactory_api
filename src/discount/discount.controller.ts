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
import { DiscountService } from './discount.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@ApiTags('discount')
@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de toutes les réductions' })
  findAll() {
    return this.discountService.getAllDiscounts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une réduction par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.getDiscountById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle réduction' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDiscountDto: CreateDiscountDto) {
    return this.discountService.createDiscount(createDiscountDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une réduction existante' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDiscountDto: UpdateDiscountDto,
  ) {
    return this.discountService.updateDiscount(id, updateDiscountDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) une réduction par son ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.discountService.softDelete(id);
  }
}
