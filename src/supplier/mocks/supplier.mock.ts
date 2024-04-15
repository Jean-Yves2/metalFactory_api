import { Supplier } from '@prisma/client';

export const SupplierMock: Supplier[] = [
  {
    id: 1,
    name: 'Pagac, Predovic and Sanford',
    SIRET: 'tneauh6yt80hqd',
    addressId: 73,
    contactEmail: 'Imani.Herman7@gmail.com',
    contactPhone: '(375) 779-2125',
    createdAt: new Date('2024-03-19T11:32:13.557Z'),
    updatedAt: new Date('2024-03-19T11:32:13.557Z'),
    deletedAt: null,
  },
  {
    id: 2,
    name: 'Fisher - Howell',
    SIRET: '6ejeqxitrqxxzp',
    addressId: 74,
    contactEmail: 'Destin.Keebler@hotmail.com',
    contactPhone: '1-660-978-2938 x00114',
    createdAt: new Date('2024-03-19T11:32:17.534Z'),
    updatedAt: new Date('2024-03-19T11:32:17.534Z'),
    deletedAt: null,
  },
  {
    id: 3,
    name: 'Quitzon, Medhurst and Mann',
    SIRET: '',
    addressId: 57,
    contactEmail: 'Terrill22@hotmail.com',
    contactPhone: '386-412-6992',
    createdAt: new Date('2024-03-19T11:17:15.273Z'),
    updatedAt: new Date('2024-03-19T11:33:08.092Z'),
    deletedAt: null,
  },
];
