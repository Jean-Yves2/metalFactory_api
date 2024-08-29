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
import { DeliveryCompanyService } from './delivery-company.service';
import { CreateDeliveryCompanyDto } from './dto/create-delivery-company.dto';
import { UpdateDeliveryCompanyDto } from './dto/update-delivery-company.dto';

@Controller('delivery-company')
export class DeliveryCompanyController {
  constructor(
    private readonly deliveryCompanyService: DeliveryCompanyService,
  ) {}

  @Get()
  async findAll() {
    return this.deliveryCompanyService.getAllDeliveryCompanies();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryCompanyService.getDeliveryCompanyById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createDeliveryCompanyDto: CreateDeliveryCompanyDto) {
    return this.deliveryCompanyService.createDeliveryCompany(
      createDeliveryCompanyDto,
    );
  }

  @Put(':id')
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
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.deliveryCompanyService.softDelete(id);
  }
}
