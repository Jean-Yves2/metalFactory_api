import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '../database/prisma/prisma.service';
import { PrismaServiceMock } from './mocks/prisma.service.mock';
import { paymentMock } from './mocks/payment.mock';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useClass: PrismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPayments', () => {
    it('should return all payments', async () => {
      expect(await service.getAllPayments()).toEqual(paymentMock);
    });
  });

  describe('getPaymentById', () => {
    it('should return a payment by id', async () => {
      const getPayment = paymentMock.find((payment) => payment.paymentId === 1);
      expect(await service.getPaymentById(1)).toEqual(getPayment);
    });

    it('should throw HttpException when payment is not found', async () => {
      const nonExistingPaymentId = 100;
      const getPaymentPromise = service.getPaymentById(nonExistingPaymentId);
      await expect(getPaymentPromise).rejects.toThrow(
        new HttpException('Payment not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('createPayment', () => {
    it('should create a payment', async () => {
      const createPaymentData = {
        orderId: 1,
        amount: 200.0,
        paymentDate: new Date(),
        paymentMethod: PaymentMethod.CARD,
        transactionId: 'TX999',
        status: PaymentStatus.COMPLETED,
      };
      expect(await service.createPayment(createPaymentData)).toEqual(
        'Payment created successfully',
      );
    });
  });

  describe('updatePayment', () => {
    it('should update a payment', async () => {
      const paymentId = 2;
      const updatedPayment = {
        amount: 300.0,
        status: PaymentStatus.PENDING,
      };
      expect(await service.updatePayment(paymentId, updatedPayment)).toEqual(
        'Payment updated successfully',
      );
    });

    it('should return null when payment is not found', async () => {
      const paymentId = 100;
      const updatedPayment = {
        amount: 300.0,
        status: PaymentStatus.PENDING,
      };
      await expect(
        service.updatePayment(paymentId, updatedPayment),
      ).rejects.toThrow(
        new HttpException('Payment not found', HttpStatus.NOT_FOUND),
      );
    });
  });

  describe('deletePayment', () => {
    it('should delete a payment', async () => {
      const paymentId = 2;
      expect(await service.deletePayment(paymentId)).toEqual(
        'Payment deleted successfully',
      );
    });

    it('should return null when payment is not found', async () => {
      const paymentId = 100;
      await expect(service.deletePayment(paymentId)).rejects.toThrow(
        new HttpException('Payment not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
