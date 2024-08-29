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
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';

@ApiTags('supplier')
@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les fournisseurs' })
  async getAllSuppliers() {
    return this.supplierService.getAllSuppliers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un fournisseur par son ID' })
  async getSupplierById(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.getSupplierById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau fournisseur' })
  @UsePipes(ValidationPipe)
  async createSupplier(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.createSupplier(createSupplierDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un fournisseur existant' })
  async updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSupplierDto: CreateSupplierDto,
  ) {
    return this.supplierService.updateSupplier(id, createSupplierDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer (soft delete) un fournisseur par son ID',
  })
  async deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.softeDeleteSupplier(id);
  }
}
