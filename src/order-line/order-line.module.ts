import { Module } from '@nestjs/common';
import { OrderLineService } from './order-line.service';
import { OrderLineController } from './order-line.controller';

@Module({
  providers: [OrderLineService],
  controllers: [OrderLineController]
})
export class OrderLineModule {}
