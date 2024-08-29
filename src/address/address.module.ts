import { WarehouseService } from './../warehouse/warehouse.service';
import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { DatabaseModule } from '../database/database.module';
import { OpenRouteService } from '../open-route/open-route.service';
import { OpenRouteModule } from '../open-route/open-route.module';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [DatabaseModule, OpenRouteModule, WarehouseModule, HttpModule],
  providers: [AddressService, OpenRouteService, WarehouseService],
  controllers: [AddressController],
})
export class AddressModule {}
