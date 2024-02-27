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
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  findAll() {
    return this.addressService.getAllAddresses();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressService.getAddressById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.addressService.softDelete(id);
  }
}
