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
import { DeliveryCompanyService } from './delivery-company.service';
import { CreateDeliveryCompanyDto } from './dto/create-delivery-company.dto';
import { UpdateDeliveryCompanyDto } from './dto/update-delivery-company.dto';

@Controller('delivery-company')
export class DeliveryCompanyController {
  constructor(
    private readonly deliveryCompanyService: DeliveryCompanyService,
  ) {}

  @Get()
  findAll() {
    return this.deliveryCompanyService.getAllDeliveryCompanies();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.deliveryCompanyService.getDeliveryCompanyById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDeliveryCompanyDto: CreateDeliveryCompanyDto) {
    return this.deliveryCompanyService.createDeliveryCompany(
      createDeliveryCompanyDto,
    );
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateDeliveryCompanyDto: UpdateDeliveryCompanyDto,
  ) {
    return this.deliveryCompanyService.updateDeliveryCompany(
      id,
      updateDeliveryCompanyDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.deliveryCompanyService.softDelete(id);
  }
}
