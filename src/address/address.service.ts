import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { PrismaService } from '../database/prisma/prisma.service';
import { OpenRouteService } from '../open-route/open-route.service';
import { WarehouseService } from '../warehouse/warehouse.service';
import { Address } from '@prisma/client';

@Injectable()
export class AddressService {
  constructor(
    private prismaService: PrismaService,
    private openRouteService: OpenRouteService,
    private warehouseService: WarehouseService,
  ) {}

  async getAllAddresses(): Promise<Address[]> {
    try {
      return await this.prismaService.address.findMany({
        where: { deletedAt: null },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting all addresses');
    }
  }

  async getAddressById(id: number): Promise<Address> {
    try {
      const address = await this.prismaService.address.findUnique({
        where: { id, deletedAt: null },
      });
      if (!address) {
        throw new NotFoundException(`Address with ID ${id} not found`);
      }
      return address;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error getting address with id ${id}`,
      );
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const { street, postalCode, city, country } = createAddressDto;
      const addressString = `${street}, ${postalCode} ${city}, ${country}`;
      const geocodeString = await this.getGeoCode(addressString);

      const { distance, warehouseId } =
        await this.calculateDistanceToNearestWarehouse(geocodeString);
      return await this.prismaService.address.create({
        data: {
          ...createAddressDto,
          geoCode: geocodeString,
          distanceToWarehouse: distance,
          nearestWarehouseId: warehouseId,
          postalCode: createAddressDto.postalCode || '',
          city: createAddressDto.city || '',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating address');
    }
  }

  async updateAddress(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.prismaService.address.findUnique({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }

    try {
      const { street, postalCode, city, country } = updateAddressDto;
      const addressString = `${street}, ${postalCode} ${city}, ${country}`;
      const geocodeString = await this.getGeoCode(addressString);

      const { distance, warehouseId } =
        await this.calculateDistanceToNearestWarehouse(geocodeString);

      return await this.prismaService.address.update({
        where: { id },
        data: {
          ...updateAddressDto,
          geoCode: geocodeString,
          distanceToWarehouse: distance,
          nearestWarehouseId: warehouseId,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error updating address with id ${id}`,
      );
    }
  }

  async softDelete(id: number): Promise<Address> {
    const address = await this.prismaService.address.findUnique({
      where: { id },
    });
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }

    try {
      return await this.prismaService.address.update({
        where: { id },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Error deleting address with id ${id}`,
      );
    }
  }

  private async calculateDistanceToNearestWarehouse(
    addressGeocode: string,
  ): Promise<{ distance: number; warehouseId: number | null }> {
    const geocode = JSON.parse(addressGeocode);
    const warehouses = await this.warehouseService.getAllWarehouses();

    let minDistance = Number.MAX_VALUE;
    let nearestWarehouseId: number | null = null;
    for (const warehouse of warehouses) {
      const warehouseAddress = await this.prismaService.address.findUnique({
        where: { id: warehouse.addressId },
      });
      if (!warehouseAddress) {
        continue;
      }
      const warehouseGeocode = JSON.parse(warehouseAddress.geoCode);
      const distance = await this.openRouteService.calculateDistance(
        geocode.coordinates,
        warehouseGeocode.coordinates,
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestWarehouseId = warehouse.id;
      }
    }
    return { distance: minDistance, warehouseId: nearestWarehouseId };
  }

  private async getGeoCode(addressString: string): Promise<string> {
    const geocode = await this.openRouteService.getGeoCode(addressString);
    return JSON.stringify(geocode.features[0].geometry);
  }
}
