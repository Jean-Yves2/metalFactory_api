import { Module } from '@nestjs/common';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { SupplierOrderLineController } from './supplier-order-line.controller';

@Module({
  providers: [SupplierOrderLineService],
  controllers: [SupplierOrderLineController],
})
export class SupplierOrderLineModule {}
