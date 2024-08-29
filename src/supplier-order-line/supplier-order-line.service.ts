import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreateSupplierOrderLineDto } from './dto/create-supplier-order-line.dto';
import { SupplierOrderLine } from '@prisma/client';

@Injectable()
export class SupplierOrderLineService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllSupplierOrderLines(): Promise<SupplierOrderLine[]> {
    return this.prismaService.supplierOrderLine.findMany();
  }

  async getSupplierOrderLineById(
    id: number,
  ): Promise<SupplierOrderLine | null> {
    const supplierOrderLine =
      await this.prismaService.supplierOrderLine.findUnique({
        where: { id: id },
      });

    if (!supplierOrderLine) {
      throw new HttpException(
        'Supplier order line not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return supplierOrderLine;
  }

  async createSupplierOrderLine(
    createSupplierOrderLineDto: CreateSupplierOrderLineDto,
  ): Promise<SupplierOrderLine> {
    return this.prismaService.supplierOrderLine.create({
      data: {
        supplierOrderId: createSupplierOrderLineDto.supplierOrderId,
        productId: createSupplierOrderLineDto.productId,
        orderedQuantity: createSupplierOrderLineDto.orderedQuantity,
        unitPriceExclTax: createSupplierOrderLineDto.unitPriceExclTax,
        receivedQuantity: createSupplierOrderLineDto.receivedQuantity || 0,
        discrepancy: createSupplierOrderLineDto.discrepancy || null,
        receivedDate: createSupplierOrderLineDto.receivedDate || null,
      },
    });
  }

  async updateSupplierOrderLine(
    id: number,
    updateDto: CreateSupplierOrderLineDto,
  ): Promise<SupplierOrderLine> {
    const existingSupplierOrderLine = await this.getSupplierOrderLineById(id);

    if (!existingSupplierOrderLine) {
      throw new HttpException(
        'Supplier order line not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prismaService.supplierOrderLine.update({
      where: { id: id },
      data: updateDto,
    });
  }

  async deleteSupplierOrderLine(id: number): Promise<string> {
    const deletedSupplierOrderLine =
      await this.prismaService.supplierOrderLine.delete({
        where: { id: id },
      });

    if (!deletedSupplierOrderLine) {
      throw new HttpException(
        'Supplier order line not found',
        HttpStatus.NOT_FOUND,
      );
    }

    return 'Supplier order line deleted successfully';
  }
}
