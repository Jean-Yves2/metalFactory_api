import { Decimal } from '@prisma/client/runtime/library';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { paymentMock } from './payment.mock';

export class PaymentServiceMock {
  // C'est une classe fictive qui sera utilisée pour remplacer la vraie classe PaymentService
  // En code, this.paymentService.getAllPayments() sera remplacé par this.getAllPayments() dans ma classe fictive.

  getAllPayments = jest.fn().mockImplementation(() => {
    return paymentMock; // Retourne une liste vide pour le moment
  });

  getPaymentById = jest.fn().mockImplementation((id: number) => {
    // Supposons qu'on ait déjà un tableau de paiements fictifs (paymentMock) pour les tests
    return paymentMock.find((payment) => payment.paymentId === id);
  });

  createPayment = jest
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
        // Il est possible que vous ayez à gérer d'autres attributs comme la relation order dans un cas réel.
      };
      paymentMock.push(newPayment);
      return 'Payment created successfully';
    });

  updatePayment = jest
    .fn()
    .mockImplementation((id: number, createPaymentDto: CreatePaymentDto) => {
      const payment = paymentMock.find((payment) => payment.paymentId === id);
      const updatePayment = {
        ...payment,
        orderId: createPaymentDto.orderId,
        amount: createPaymentDto.amount,
        paymentDate: createPaymentDto.paymentDate,
        paymentMethod: createPaymentDto.paymentMethod,
        transactionId: createPaymentDto.transactionId,
        status: createPaymentDto.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      return updatePayment;
    });

  deletePayment = jest.fn().mockImplementation((id: number) => {
    const payment = paymentMock.find((payment) => payment.paymentId === id);
    const deletepayment = {
      ...payment,
      deletedAt: new Date(),
    };
    return deletepayment;
  });
}
