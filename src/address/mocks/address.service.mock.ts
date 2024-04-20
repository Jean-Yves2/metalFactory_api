import { addressMock } from './address.mock';

export class AddressServiceMock {
  getAllAddresses = jest.fn().mockImplementation(() => {
    const allAddresses = addressMock.filter(
      (address) => address.deletedAt === null,
    );
    return allAddresses;
  });
  getAddressById = jest.fn().mockImplementation((id: number) => {
    const address = addressMock.find(
      (address) => address.id === id && address.deletedAt === null,
    );
    return address;
  });
  createAddress = jest.fn();
  updateAddress = jest.fn();
}
