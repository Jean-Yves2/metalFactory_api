import { Decimal } from '@prisma/client/runtime/library.js';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { paymentMock } from '../mocks/payment.mock';

export class PrismaServiceMock {
  payment = {
    findMany: jest.fn().mockImplementation(() => {
      return paymentMock;
    }),
    findUnique: jest.fn().mockImplementation((params) => {
      const payment = paymentMock.find(
        (payment) => payment.paymentId === params.where.paymentId,
      );
      return payment;
    }),
    create: jest
      .fn()
      .mockImplementation((createPaymentDto: CreatePaymentDto) => {
        const newPayment = {
          paymentId: paymentMock.length + 1,
          orderId: createPaymentDto.orderId,
          amount: new Decimal(1000),
          paymentDate: createPaymentDto.paymentDate,
          paymentMethod: createPaymentDto.paymentMethod,
          transactionId: createPaymentDto.transactionId,
          status: createPaymentDto.status,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        };
        paymentMock.push(newPayment);
        return newPayment;
      }),

    update: jest.fn().mockImplementation((params) => {
      const paymentIndex = paymentMock.findIndex(
        (payment) =>
          payment.paymentId === params.where.paymentId &&
          payment.deletedAt === null,
      );

      if (paymentIndex !== -1) {
        paymentMock[paymentIndex] = {
          ...paymentMock[paymentIndex],
          ...params.data,
          updatedAt: new Date(),
        };
        return paymentMock[paymentIndex];
      } else {
        return null;
      }
    }),
    delete: jest.fn().mockImplementation((params) => {
      const paymentIndex = paymentMock.findIndex(
        (payment) => payment.paymentId === params.where.paymentId,
      );

      if (paymentIndex !== -1) {
        paymentMock[paymentIndex].deletedAt = new Date();
        return paymentMock[paymentIndex];
      } else {
        return null;
      }
    }),
  };
}
