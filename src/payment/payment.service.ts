import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from '@prisma/client';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.prismaService.payment.findMany();
  }

  async getPaymentById(id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { paymentId: id, deletedAt: null },
    });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    return payment;
  }

  async createPayment(createPaymentDto: CreatePaymentDto) {
    await this.prismaService.payment.create({
      data: {
        orderId: createPaymentDto.orderId,
        amount: createPaymentDto.amount,
        paymentDate: createPaymentDto.paymentDate,
        paymentMethod: createPaymentDto.paymentMethod,
        transactionId: createPaymentDto.transactionId,
        status: createPaymentDto.status,
        updatedAt: new Date(),
      },
    });
    return 'Payment created successfully';
  }

  async updatePayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.prismaService.payment.findUnique({
      where: { paymentId: id, deletedAt: null },
    });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.payment.update({
      where: { paymentId: id },
      data: {
        orderId: updatePaymentDto.orderId,
        amount: updatePaymentDto.amount,
        paymentDate: updatePaymentDto.paymentDate,
        paymentMethod: updatePaymentDto.paymentMethod,
        transactionId: updatePaymentDto.transactionId,
        status: updatePaymentDto.status,
        updatedAt: new Date(),
      },
    });
    return 'Payment updated successfully';
  }

  async deletePayment(id: number) {
    const payment = await this.prismaService.payment.findUnique({
      where: { paymentId: id, deletedAt: null },
    });

    if (!payment) {
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.payment.update({
      where: { paymentId: id },
      data: {
        deletedAt: new Date(),
      },
    });
    return 'Payment deleted successfully';
  }
}
