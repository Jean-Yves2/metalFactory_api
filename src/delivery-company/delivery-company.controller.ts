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
import { DeliveryCompanyService } from './delivery-company.service';
import { CreateDeliveryCompanyDto } from './dto/create-delivery-company.dto';
import { UpdateDeliveryCompanyDto } from './dto/update-delivery-company.dto';

@ApiTags('delivery-company')
@Controller('delivery-company')
export class DeliveryCompanyController {
  constructor(
    private readonly deliveryCompanyService: DeliveryCompanyService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtenir la liste de toutes les entreprises de livraison',
  })
  async findAll() {
    return this.deliveryCompanyService.getAllDeliveryCompanies();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une entreprise de livraison par son ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryCompanyService.getDeliveryCompanyById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle entreprise de livraison' })
  async create(@Body() createDeliveryCompanyDto: CreateDeliveryCompanyDto) {
    return this.deliveryCompanyService.createDeliveryCompany(
      createDeliveryCompanyDto,
    );
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Mettre à jour une entreprise de livraison existante',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryCompanyDto: UpdateDeliveryCompanyDto,
  ) {
    return this.deliveryCompanyService.updateDeliveryCompany(
      id,
      updateDeliveryCompanyDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Supprimer (soft delete) une entreprise de livraison par son ID',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryCompanyService.softDelete(id);
  }
}
