import { AddressType } from '@prisma/client';
import { CreateUserDto } from '../dto/createUserdto';

export const userMock = [
  {
    id: 1,
    firstName: 'Michael',
    lastName: 'Smith',
    email: 'm.smith@example.com',
    password: 'SecurePass123!',
    companyName: 'Smith & Co.',
    address: {
      street: '456 Maple Avenue',
      postalCode: '54321',
      city: 'Mapletown',
      country: 'United States',
      distanceToWarehouse: 20,
      type: AddressType.DELIVERY,
    },
    phone: '987-654-3210',
  },
  {
    id: 2,
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'e.brown@example.com',
    password: 'Brownie1234#',
    companyName: 'Brown Enterprises',
    address: {
      street: '101 Pine Street',
      postalCode: '67890',
      city: 'Pineville',
      country: 'United States',
      distanceToWarehouse: 25,
      type: AddressType.DELIVERY,
    },
    phone: '555-123-4567',
  },
  {
    id: 3,
    firstName: 'Daniel',
    lastName: 'Miller',
    email: 'd.miller@example.com',
    password: 'StrongPWD456$',
    companyName: 'Miller Solutions',
    address: {
      street: '789 Elm Street',
      postalCode: '13579',
      city: 'Elmvale',
      country: 'United States',
      distanceToWarehouse: 30,
      type: AddressType.DELIVERY,
    },
    phone: '321-987-6543',
  },
];

export const userMockFromDelete = [
  {
    id: 4,
    email: 'Arnold.Wolff@gmail.com',
    password: 'v6SD601PbSoBNx0',
    role: 'USER',
    userType: 'CUSTOMER',
    firstName: 'Donald',
    lastName: 'Stark',
    phone: '538.933.1914 x9356',
    isProfessional: false,
    siret: 'null',
    companyName: 'ABCaaa Company',
    createdAt: '2024-04-02T17:44:37.422Z',
    updatedAt: '2024-04-03T19:54:57.027Z',
    deletedAt: Date,
  },
];

export const userMockForCreate: CreateUserDto = {
  firstName: 'bal2e',
  lastName: 'Dfgdfgjgffgkhdgoee',
  email: 'jogdfhkjhkfgf12dlmMhengfv1.doe@example.com',
  password: 'baltazar111111*B11e1111122',
  companyName: 'Exampfhlegd Companye',
  address: {
    street: '123 Maihgfggdn St',
    postalCode: '1233166654415',
    city: 'Exampdhgjgfgfle City',
    country: 'Examplfggjde Country',
    distanceToWarehouse: 10,
    type: 'DELIVERY', // Assuming the default type is 'DELIVERY'
  },
  phone: '123456544568554705455214890',
};
