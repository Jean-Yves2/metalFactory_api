import { Controller, Param, ParseIntPipe, Post, Delete } from '@nestjs/common';
import { FakerService } from './faker.service';

@Controller('faker')
export class FakerController {
  constructor(private readonly fakerService: FakerService) {}

  @Post('user')
  async generateFakeUser(): Promise<string> {
    await this.fakerService.generateOneFakeUser();
    return 'Fake user generated successfully.';
  }

  @Post('users/:id')
  async generateFakeUsers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    await this.fakerService.generateManyFakeUsers(id);
    return 'Fake users generated successfully.';
  }

  @Post('supplier')
  async generateFakeSupplier(): Promise<string> {
    await this.fakerService.generateOneSupplier();
    return 'Fake supplier generated successfully.';
  }

  @Post('suppliers/:id')
  async generateFakeSuppliers(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string> {
    await this.fakerService.generateManySuppliers(id);
    return 'Fake suppliers generated successfully.';
  }

  @Delete('delete/all')
  async deleteAllData(): Promise<string> {
    await this.fakerService.deleteAllData();
    return 'All fake users deleted successfully.';
  }
}
