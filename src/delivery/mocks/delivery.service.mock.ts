import { deliveryMock } from './delivery.mock';
export class DeliveryServiceMock {
  getAllDeliveries = jest.fn().mockImplementation(() => {
    return deliveryMock;
  });
  getDeliveryById = jest.fn();
  createDelivery = jest.fn();
  updateDelivery = jest.fn();
}
