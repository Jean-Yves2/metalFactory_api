import { Injectable } from '@nestjs/common';
import * as faker from 'faker';
import { PrismaService } from '../../database/prisma/prisma.service';
import { UserType, AddressType } from '@prisma/client';

@Injectable()
export class FakerService {
  constructor(private readonly prisma: PrismaService) {}

  async generateOneFakeUser() {
    const userTypes = [UserType.CUSTOMER, UserType.INTERNAL];
    const addressTypes = [AddressType.DELIVERY, AddressType.BILLING];

    const randomUserType =
      userTypes[Math.floor(Math.random() * userTypes.length)];

    const randomAddressType =
      addressTypes[Math.floor(Math.random() * addressTypes.length)];

    const fakeUser = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      companyName: faker.company.companyName(),
      userType: randomUserType,

      address: {
        street: faker.address.streetAddress(),
        postalCode: faker.address.zipCode(),
        city: faker.address.city(),
        country: faker.address.country(),
        distanceToWarehouse: faker.datatype.number({ min: 1, max: 20 }),
        type: randomAddressType,
      },
      phone: faker.phone.phoneNumber(),
    };

    await this.prisma.user.create({
      data: {
        firstName: fakeUser.firstName,
        lastName: fakeUser.lastName,
        email: fakeUser.email,
        password: fakeUser.password,
        companyName: fakeUser.companyName,
        userType: randomUserType,
        addresses: {
          create: [
            {
              type: randomAddressType,
              address: {
                create: {
                  street: fakeUser.address.street,
                  postalCode: fakeUser.address.postalCode,
                  city: fakeUser.address.city,
                  country: fakeUser.address.country,
                  distanceToWarehouse: fakeUser.address.distanceToWarehouse,
                },
              },
            },
          ],
        },
        phone: fakeUser.phone,
      },
    });
  }

  async generateManyFakeUsers(count: number) {
    for (let i = 0; i < count; i++) {
      await this.generateOneFakeUser();
    }
  }
}
