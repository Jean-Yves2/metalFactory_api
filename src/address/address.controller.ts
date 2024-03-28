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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  async findAll() {
    try {
      return await this.addressService.getAllAddresses();
    } catch (error) {
      throw new InternalServerErrorException('Error getting all addresses');
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.addressService.getAddressById(id);
    } catch (error) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAddressDto: CreateAddressDto) {
    try {
      return await this.addressService.createAddress(createAddressDto);
    } catch (error) {
      throw new InternalServerErrorException('Error creating address');
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    try {
      return await this.addressService.updateAddress(id, updateAddressDto);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating address with id ${id}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.addressService.softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting address with id ${id}`,
      );
    }
  }
}
