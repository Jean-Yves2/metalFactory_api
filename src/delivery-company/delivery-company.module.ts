import { Module } from '@nestjs/common';
import { DeliveryCompanyService } from './delivery-company.service';
import { DeliveryCompanyController } from './delivery-company.controller';

@Module({
  providers: [DeliveryCompanyService],
  controllers: [DeliveryCompanyController],
})
export class DeliveryCompanyModule {}
