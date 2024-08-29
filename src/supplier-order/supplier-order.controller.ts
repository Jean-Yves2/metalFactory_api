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
import { SupplierOrderService } from './supplier-order.service';
import { CreateSupplierOrderDto } from './dto/create-supplier-order.dto';
import { UpdateSupplierOrderDto } from './dto/update-supplier-order.dto';

@ApiTags('supplier-order')
@Controller('supplier-order')
export class SupplierOrderController {
  constructor(private readonly supplierOrderService: SupplierOrderService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtenir la liste de toutes les commandes fournisseur',
  })
  findAll() {
    return this.supplierOrderService.getAllSupplierOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une commande fournisseur par son ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderService.getSupplierOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle commande fournisseur' })
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createSupplierOrderDto: CreateSupplierOrderDto) {
    return this.supplierOrderService.createSupplierOrder(
      createSupplierOrderDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une commande fournisseur existante' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSupplierOrderDto: UpdateSupplierOrderDto,
  ) {
    return this.supplierOrderService.updateSupplierOrder(
      id,
      updateSupplierOrderDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer (soft delete) une commande fournisseur par son ID',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.supplierOrderService.softDelete(id);
  }
}
