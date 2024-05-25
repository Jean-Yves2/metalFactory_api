import { Module } from '@nestjs/common';
import { SupplierOrderLineService } from './supplier-order-line.service';
import { SupplierOrderLineController } from './supplier-order-line.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [SupplierOrderLineService],
  controllers: [SupplierOrderLineController],
})
export class SupplierOrderLineModule {}
