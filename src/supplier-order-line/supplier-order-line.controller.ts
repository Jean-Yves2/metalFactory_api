import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { CreateSupplierOrderLineDto } from './dto/create-supplier-order-line.dto';

@ApiTags('supplier-order-line')
@Controller('supplier-order-line')
export class SupplierOrderLineController {
  constructor(
    private readonly supplierOrderLineService: SupplierOrderLineService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtenir la liste de toutes les lignes de commande fournisseur',
  })
  async getAllSupplierOrderLines() {
    return this.supplierOrderLineService.getAllSupplierOrderLines();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtenir une ligne de commande fournisseur par son ID',
  })
  async getSupplierOrderLineById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderLineService.getSupplierOrderLineById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle ligne de commande fournisseur' })
  @UsePipes(ValidationPipe)
  async createSupplierOrderLine(@Body() createDto: CreateSupplierOrderLineDto) {
    return this.supplierOrderLineService.createSupplierOrderLine(createDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Mettre à jour une ligne de commande fournisseur existante',
  })
  async updateSupplierOrderLine(
    @Param('id', ParseIntPipe) id: number,
    @Body() createDto: CreateSupplierOrderLineDto,
  ) {
    return this.supplierOrderLineService.updateSupplierOrderLine(id, createDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'Supprimer (soft delete) une ligne de commande fournisseur par son ID',
  })
  async deleteSupplierOrderLine(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderLineService.deleteSupplierOrderLine(id);
  }
}
