import { Module } from '@nestjs/common';
import { SupplierOrderService } from './supplier-order.service';
import { SupplierOrderController } from './supplier-order.controller';

@Module({
  providers: [SupplierOrderService],
  controllers: [SupplierOrderController],
})
export class SupplierOrderModule {}
