import { Module } from '@nestjs/common';
import { SupplierOrderService } from './supplier-order.service';
import { SupplierOrderController } from './supplier-order.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SupplierOrderService],
  controllers: [SupplierOrderController],
})
export class SupplierOrderModule {}
