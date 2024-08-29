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
  createAddress = jest.fn().mockImplementation((address) => {
    addressMock.push(address);
    return address;
  });
  updateAddress = jest.fn().mockImplementation((id: number, address) => {
    const index = addressMock.findIndex(
      (address) => address.id === id && address.deletedAt === null,
    );
    addressMock[index] = address;
    return address;
  });
  softDelete = jest.fn().mockImplementation((id: number) => {
    const index = addressMock.findIndex(
      (address) => address.id === id && address.deletedAt === null,
    );

    addressMock[index] = {
      ...addressMock[index],
      deletedAt: new Date(),
    };
    return 'Address deleted successfully';
  });
}
