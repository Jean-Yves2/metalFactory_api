import { Module } from '@nestjs/common';
import { DeliveryCompanyService } from './delivery-company.service';
import { DeliveryCompanyController } from './delivery-company.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [DeliveryCompanyService],
  controllers: [DeliveryCompanyController],
})
export class DeliveryCompanyModule {}
