import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierOrderLineDto } from './create-supplier-order-line.dto';

export class UpdateSupplierOrderLineDto extends PartialType(
  CreateSupplierOrderLineDto,
) {}
