import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
// import { PrismaService } from '../database/prisma/prisma.service'; // Uncomment if real DB connection is required in services
import { PaymentServiceMock } from './mocks/payment.service.mock';
import { paymentMock } from './mocks/payment.mock';
import { PaymentMethod, PaymentStatus } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [{ provide: PaymentService, useClass: PaymentServiceMock }],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllPayments', () => {
    it('should return all payments', async () => {
      expect(await controller.getAllPayments()).toEqual(paymentMock);
    });
  });

  describe('getPaymentById', () => {
    it('should return a payment by id', async () => {
      const expectedPayment = paymentMock.find(
        (payment) => payment.paymentId === 1,
      );
      expect(await controller.getPaymentById(1)).toEqual(expectedPayment);
    });
  });

  describe('createPayment', () => {
    it('should create a payment', async () => {
      const newPayment = {
        orderId: 1,
        amount: 1000,
        paymentDate: new Date('2024-05-01T08:00:00.000Z'),
        paymentMethod: PaymentMethod.CARD,
        transactionId: 'TX123',
        status: PaymentStatus.COMPLETED,
      };
      expect(await controller.createPayment(newPayment)).toEqual(
        'Payment created successfully',
      );
    });
  });

  describe('updatePayment', () => {
    it('should update a payment', async () => {
      const paymentUpdateData = {
        orderId: 1,
        amount: 1000,
        paymentDate: new Date('2024-05-01T08:00:00.000Z'),
        paymentMethod: PaymentMethod.CARD,
        transactionId: 'TX123',
        status: PaymentStatus.COMPLETED, // Updated amount
      };
      expect(await controller.updatePayment(1, paymentUpdateData)).toEqual({
        paymentId: 1,
        orderId: 1,
        amount: 1000,
        paymentDate: new Date('2024-05-01T08:00:00.000Z'),
        paymentMethod: PaymentMethod.CARD,
        transactionId: 'TX123',
        status: PaymentStatus.COMPLETED,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: null,
      });
    });
  });

  describe('deletePayment', () => {
    it('should delete a payment', async () => {
      expect(await controller.deletePayment(1)).toEqual({
        paymentId: 1,
        orderId: 1,
        amount: new Decimal(1000),
        paymentDate: new Date('2024-05-01T08:00:00.000Z'),
        paymentMethod: PaymentMethod.CARD,
        transactionId: 'TX123',
        status: PaymentStatus.COMPLETED,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        deletedAt: expect.any(Date),
      });
    });
  });
});
