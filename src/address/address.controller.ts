import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger'; // Importation de l'ApiOperation
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de toutes les adresses' })
  async findAll() {
    return this.addressService.getAllAddresses();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une adresse par son ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getAddressById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Créer une nouvelle adresse' })
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une adresse existante' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer (soft delete) une adresse' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.softDelete(id);
  }
}
