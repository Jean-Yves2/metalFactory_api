import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class OpenRouteService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPEN_ROUTE_API_KEY');
    this.apiUrl = this.configService.get<string>('OPEN_ROUTE_API_URL');
  }

  async calculateDistance(origin: string, destination: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.apiUrl}/directions/driving-car/geojson?api_key=${this.apiKey}&start=${origin}&end=${destination}`,
        ),
      );
      // Ensure the response is valid and contains the expected data
      if (!response.data || response.data.features.length === 0) {
        throw new NotFoundException('Route not found.');
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // Here you can catch specific errors and re-throw them as you wish
      if (axiosError.response && axiosError.response.status === 404) {
        throw new NotFoundException('Route not found.');
      }
      throw axiosError; // Re-throw the error if it doesn't match a handled case
    }
  }

  async getGeoCode(address: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.apiUrl}/geocode/search?api_key=${this.apiKey}&text=${address}`,
        ),
      );
      // Check if geolocation returned a result
      if (!response.data || response.data.features.length === 0) {
        throw new NotFoundException('Address not found.');
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      // Specifically handle not found geocoding errors
      if (axiosError.response && axiosError.response.status === 404) {
        throw new NotFoundException('Address not found.');
      }
      throw error; // Re-throw the error if it doesn't match a handled case
    }
  }
}
