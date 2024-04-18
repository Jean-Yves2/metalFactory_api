import { deliveryMock } from './delivery.mock';
export class DeliveryServiceMock {
  getAllDeliveries = jest.fn().mockImplementation(() => {
    return deliveryMock;
  });
  getDeliveryById = jest.fn().mockImplementation((id: number) => {
    return deliveryMock.find((delivery) => delivery.id === id);
  });
  createDelivery = jest.fn();
  updateDelivery = jest.fn();
}
